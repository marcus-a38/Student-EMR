/* Retries a given asynchronous function a certain number of times */
export async function retryOnFailure(
  attempts=10, 
  delay=1000, 
  timeout=6000, 
  func, ...args
) {

  let count = 0;
  while (count < attempts) {
    
    try {
      const result = await func(...args);
      return result;
    } 
    catch (error) {
      console.error();
      count++;
      await sleep(delay);
      delay *= 2;
    }

  }

  console.error();
  return null;

}