import Scrypt from 'scrypt-kdf';
import {retryOnFailure} from 'actions-util';
import db from './db'; // Assuming you have a module for database connection

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_DURATION = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
const SHORT_LOCK_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export async function login(username, password, ip) {
  try {
    const user = await retryOnFailure(findUser, username, true, true);
    if (!user) {
      return {
        success: false,
        error: {
          message: `An account could not be found for the user '${username}'.`,
          code: '',
        },
      };
    }

    if (user.lock_expiration && new Date() < new Date(user.lock_expiration)) {
      return {
        success: false,
        error: {
          message: `The account for user '${username}' is locked for DD:HH:MM.`,
          code: '',
        }
      };
    }

    const passwordValid = await verifyPassword(user.password, password);
    if (!passwordValid) {
      await retryOnFailure(incrementLoginAttempts, user.id, ip);
      return {
        success: false,
        error: {
          message: `Invalid password for user '${username}'.`,
          code: '',
        }
      };
    }

    await retryOnFailure(resetLoginAttempts, user.id);
    await retryOnFailure(updateLastLogin, user.id, ip);

    return {
      success: true,
      body: {
        message: `Login successful for user '${username}'.`,
        code: '',
        user_id: user.id,
        user_type: user.usertype
      },
    };

  } catch (error) {
    console.error(`An issue was encountered while logging in: ${error}`);
    return {
      success: false,
      message: `Problems logging in, please try again later.`,
      code: '',
    };
  }
}

export async function findUser(usernameOrUserId, includePassword, includeLoginDetails) {
  
  let searchType = typeof usernameOrUserId;
  if (!searchType in ['string', 'number', 'bigint']) {
    throw new Error('');
  } 
  switch (searchType) {
    case 'string':
      searchType = 'username';
      break;
    default:
      searchType = 'id';
      break;
  }

  try {
    const sql = `
      SELECT 
        id,
        username,
        usertype
        ${includePassword ? ', password,' : ''}
        ${includeLoginDetails ? `
          subsequent_login_attempts,
          last_login_attempt,
          last_login_ip,
          lock_expiration
          ` : ''}
      FROM user 
      WHERE username = ?;`;
    const result = await db.query(sql, [username]);
    return result[0];
  } catch (error) {
    console.error(`Error fetching user '${username}':`, error);
    return null;
  }
}

export async function verifyPassword(hashedPassword, plaintextPassword) {
  try {
    const buffer = Buffer.from(hashedPassword, 'base64');
    return await Scrypt.verify(buffer, plaintextPassword);
  } catch (error) {
    console.error(`Error verifying password:`, error);
    return false;
  }
}

async function incrementLoginAttempts(userId, ip) {
  try {
    const user = await findUserById(userId);

    let lockExpiration = null;
    if (user.subsequent_login_attempts + 1 >= MAX_LOGIN_ATTEMPTS) {
      lockExpiration = new Date(Date.now() + LOCK_DURATION);
    } else if (user.last_login_ip && user.last_login_ip !== ip && Date.now() - new Date(user.last_login_attempt).getTime() < 5 * 60 * 1000) {
      lockExpiration = new Date(Date.now() + SHORT_LOCK_DURATION);
    }

    const sql = `
      UPDATE user 
      SET 
        subsequent_login_attempts = subsequent_login_attempts + 1,
        last_login_attempt = NOW(),
        lock_expiration = ?
      WHERE id = ?`;
    await db.query(sql, [lockExpiration, userId]);
  } catch (error) {
    console.error(`Error incrementing login attempts for user ID '${userId}':`, error);
  }
}

async function resetLoginAttempts(userId) {
  try {
    const sql = `
      UPDATE user 
      SET 
        subsequent_login_attempts = 0,
        lock_expiration = NULL
      WHERE id = ?`;
    await db.query(sql, [userId]);
  } catch (error) {
    console.error(`Error resetting login attempts for user ID '${userId}':`, error);
  }
}

async function updateLastLogin(userId, ip) {
  try {
    const sql = `
      UPDATE user 
      SET 
        last_login_attempt = NOW(),
        last_login_ip = ?
      WHERE id = ?`;
    await db.query(sql, [ip, userId]);
  } catch (error) {
    console.error(`Error updating last login for user ID '${userId}':`, error);
  }
}