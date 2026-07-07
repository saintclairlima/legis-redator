import { IsNotEmpty, IsString } from "node_modules/class-validator";

export class AutenticacaoDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  senha: string;
}
