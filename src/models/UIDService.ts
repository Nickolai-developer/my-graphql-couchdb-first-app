
/**
 * CouchDB docs states not to use their _id parameter, it's must be used only for their inner db logic;
 * there we just assign random id and hope ids'll never intersect;
 * if it really needs, it's possible to add moire logic here
 */
export default function newUniqueID(obj: { title?: string; name?: string }): string {
  const postfix = "_" + (obj.title ? "book" : obj.name ? "person" : "id");
  return randomBytes(32) + postfix;
}

function randomBytes(len: number): string {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(Math.floor(Math.random() * 256));
  }
  return arr.map(n => n.toString(16)).join("");
}
