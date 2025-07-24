import { PUBLIC_KEY_BASE64 } from '../configs/AppConfig';

export async function encryptWithPublicKey(message) {
  const binaryDer = Uint8Array.from(atob(PUBLIC_KEY_BASE64), c => c.charCodeAt(0));

  const publicKey = await window.crypto.subtle.importKey(
    "spki",
    binaryDer.buffer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256"
    },
    false,
    ["encrypt"]
  );

  const encoded = new TextEncoder().encode(message);
  const ciphertext = await window.crypto.subtle.encrypt({ name: "RSA-OAEP" }, publicKey, encoded);
  return btoa(String.fromCharCode(...new Uint8Array(ciphertext)));
}
