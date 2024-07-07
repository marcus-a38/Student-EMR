import {setTimeout as asyncTimeout} from 'timers/promises';

const Throttler = () => {
  this.sessionId = 0;
  this.limit = 0;
  this.count = 0;
  this.rate = 0;
  this.cooldown = 0;

}


Throttler.prototype.newRequest = function() {

  if (this.count >= this.limit) {
    return;
  } else {
    (async () => {
      return await asyncTimeout(this.rate, this.count--);
    })();
  }

}