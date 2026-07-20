import { IsNumber, IsOptional } from 'class-validator';

export class CreateReferenciaElementoDto {
    @IsNumber()
    idReferencia: number;

    @IsNumber()
    idElemento: number;

    @IsNumber()
    score?: number;
    
    @IsNumber()
    @IsOptional()
    idUsuarioCriacao?: number;
}
