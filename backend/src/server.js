"use strict"

import { compress, decompress } from './utils/compresion';
import { newRequestKey, newSessionKey } from './utils/redis-keys';
import cors from 'cors';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import express, { static as estatic } from 'express';
import helmet from 'helmet';
import mysql from 'mysql';
import session, { genuuid } from 'express-session';
import path from 'path';
import pool from './db';
import https from 'https';
import authorizeRequest from 'auth';
import { promisify } from 'util';
import { resolve } from 'url';


const app = express();
const port = 3000;

const redisCache = createClient({
  url: 'root:password@localhost:3000'
});
const redisAsyncSet = promisify(redisCache.set).bind(redisCache);
const redisAsyncGet = promisify(redisCache.get).bind(redisCache);
const redisClientActive = () => {
  return !!cache?.isOpen;
}

function sessionDestroy(req) {
  req.session.destroy((err) => {

  });
}

/*

  REDIS

*/

const redisCacheMiddleware = () => {

  return(
    async (req, res, next) => {

      if (!redisClientActive()) {
        return next();
      }


      next();
    }
  );

}

const redisSessionMiddleware = () => {
}


const authenticationMiddleware = (req, res, next) => {
  if (!(req.session && req.session.userId)) res.redirect('/login');
  next();
}

// Set middleware and enhance security with helmet
app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );
app.use( cors({
  origin: 'https://localhost:80',
  optionsSuccessStatus: 200,
}));
app.use( helmet({
  contentSecurityPolicy: {
    directives: {
      'default-src': ["'self'"],
      'script-src': ["'self'", 'https://localhost:80'],
      'connect-src': ["'self'", 'https://localhost:80'],
    },
  },
}));
app.use( redisCacheMiddleware() );
app.use( authenticationMiddleware() );

// Serve the static files
app.use( estatic(path.join(__dirname, "../app/build")) );

// Start session
app.use( session({
  secret: '',
  cookie: {
    secure: true,
    maxAge: 60_000,
  },
  store: new RedisStore({
    host: '',
    port: '',
    client: ''
  }),
  genid: genuuid(),
  saveUninitialized: false,
}) );

/* Logout */
app.post('/', (req, res) => {

  if (!req.body.action === 'logout') return;

  req.session.destroy(err => {
    if (err) {
      res.status(500).json({ 
        success: false, 
        error: {
          code: 500,
          message: 'Logout failed.',
        }
      });
    } else {
      res.json({
        success: true, 
        error: {
          code: 200,
          message: 'Logout successful.',
        }
      });
    }
  });
});

/* Login */
app.post('/login', (req, res) => {

  if (!req.body.action === 'login') {
    return;
  }

  if (req.sessionID === 'has existing logged in session') {
    return;
  }

  // edit
  const username = req.body.username;
  const password = req.body.password;
  const queryResults = findUser(username, true);
  if (!queryResults) {return;}
  let verified = verifyPassword(username, password);

  if (verified) {
    res.status(200).json({ 
      success: true, 
      message: 'Login successful.'
    });
  } else {
    res.status(401).json({ 
      success: false, 
      error: {
        code: 401, 
        message: 'Login unsuccessful... Invalid credentials or unauthorized request.',
      },
    });
  }
  res.status(400).json({
    success: false,
    error: {
      code: 400,
      message: 'Login unsuccessful... See developer logs for more details.',
    },
  });
});

app.get('/search', (req, res) => {
  try {
    const type = req.body.search_type;
    if (type === 'mrn') {
      const mrn = req.body.mrn;
    } else if (type === 'det') {
      const details = req.body;
    } else {
      res.status(400).json({
        success: false,
        error: {
          code: 400,
          message: 'Invalid search type for request.'
        }
      })
    }
  }
  catch (error) {
    
  } 
});

app.get('/view', (req, res) => {

});


/*

  HTTPS

*/

if (environmentType === 'dev') {

} else if (environmentType === 'prod') {

} else {

}

const ssl = {
  key: fs.readFileSync(path.join(__dirname, )),
  cert: fs.readFileSync(path.join(__dirname, )),
};

https.createServer(ssl, app).listen()

app.listen(port, () => {

});