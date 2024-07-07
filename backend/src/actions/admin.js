const UserActions = Object.freeze({
  REMOVE: 1,
  PROMOTE: 2,
  DEMOTE: 3,
  LOCK: 4,
});

const userActionsMap = new Map({
  1: remove,
  2: promote,
  3: demote,
  4: lock
});

export async function addUser(username, plaintextPassword) {

}

function validateType(type) {
  if (type === 'string') {
    return 1;
  } else if (type in ['number', 'bigint']) {
    return 0;
  } else {
    return -1;
  }
}

export async function modifyUser(usernameOrUserId, action) {

  let typeofUserParameter = validateType( typeof usernameOrUserId );
  let typeofActionParameter = validateType( typeof action );

  if (!(action in Object.values(UserActions))) {
    return;
  }

  userActionsMap.get(action)(usernameOrUserId, isUserId);

}

async function remove(usernameOrUserId, isUserId) {

}

async function promote(usernameOrUserId, isUserId) {

}

async function demote(usernameOrUserId, isUserId) {

}

async function lock(usernameOrUserId, isUserId) {
  
}