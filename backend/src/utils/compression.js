import zlib from 'zlib';

const deflate = promisify(zlib.deflateSync);
const inflate = promisify(zlib.inflateSync);

export async function compress(data) {
  let deflated = await deflate(data)
  .catch((err) => {

  });
  return deflated.toString('base64');
}
  
export async function decompress(data) {
  let inflated = await inflate(Buffer.from(data, 'base64'))
  .catch((err) => {

  });
  return inflated.toString();
}