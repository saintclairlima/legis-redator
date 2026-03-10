import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
const crypto = require('crypto');

@Injectable()
export class HashService {
  async gerarHashSenha(senha: string) {
    return await bcrypt.hash(senha, 10);
  }

  async compararHash(string1: string, string2: string): Promise<boolean> {
    return await bcrypt.compare(string1, string2);
  }

  gerarToken(): string {
    return crypto.randomUUID();
  }
}
