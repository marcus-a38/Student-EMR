/* Finds the difference of two arrays a and b */
function arrayDiff(a, b) {

  /* Convert a and b arrays to sets and instantiate the array diff */
  let aSet = new Set(a);
  let bSet = new Set(b);
  let diff;

  /* Return the other array if one is empty */
  if (a.length === 0) return [...bSet];
  if (b.length === 0) return [...aSet];

  /* Find the odd/missing elements using the bigger array */
  if (a.length >= b.length) {                                                                           
    diff = new Set( a.filter(x => !bSet.has(x)) );
  } else {
    diff = new Set( b.filter(x => !aSet.has(x)) );
  }

  /* Splat and convert back to array */
  return [...diff];

}

/* Checks that the client has a valid and consistent session ID */
function authorizeSession(id) {

}

/* Checks the source/origin of a request */
function authorizeXss(src) {

}

/* Checks that STRICTLY the accepted headers are present for a request */
function validateHeaders(headers) {

  let validHeaders = ['Content-Type', 'Authorization'];
  let diff = arrayDiff(headers, validHeaders);
  return diff.length === 0;

}

function validateUserNotLocked(id) {

  let id = req.sessionId;
  let locked = getLockStatus(id);
  return locked !== 'undefined';

}

/* Authorize/validate the session, check the headers, and verify the source. */
export function authorizeRequest(req, res) {

  let sessionId = req.sessionId;
  let clientJwe = req.jwe;
  let source = req.xss;
  let auth = 
    authorizeSession() && 
    authorizeXss() && 
    validateHeaders() &&
    validateUserNotLocked();

  if (!auth) {
    res.status(401).json({
      success: false,
      error: {
        code: 401,
        message: 'Unauthorized request rejected.',
      }
    });
  } 

  return auth;

}

export default async function authMiddleware() {

}

/* Locked account levels: 

  1. 0 - no lock
  3. 1 - 30 min lock
  4. 2 - 1 hr lock
  5. 3 - 3 hr lock
  6. 4 - completely locked (contact IT)

*/