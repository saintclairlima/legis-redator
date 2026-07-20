import { createHash } from 'crypto';
import { AlgoritmoHash } from './algoritmo-hash.enum';

export function gerarHashReferencia(texto: string) {
  const algoritmoHash = AlgoritmoHash.SHA256;
  const hash = createHash(algoritmoHash).update(texto).digest('hex');
  return { hash, algoritmoHash };
}