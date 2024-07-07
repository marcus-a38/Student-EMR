import hash from 'hash';

/* Convert a cache request to a hashed token */
export function newRequestKey(req) {

    const payload = {
      query: req.query,
      body: req.body,
    };
  
    return `${req.path}@cache:${hash.sha1(payload)}`;
  
  }

/* Create a session key */
export function newSessionKey(req) {

    /*
  
    */
  
    const payload = {
      query: req.query,
      body: req.body,
    };
  
    return `${req.path}@session:${hash.sha1(payload)}`;
  
  }