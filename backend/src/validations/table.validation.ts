import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateTableDto {
    @IsString()
    name!: string;

    @IsNumber()
    size!: number;

    @IsUUID()
    merchantId!: string;
}

export class EditTableDto {
    @IsString()
    name!: string;

    @IsNumber()
    size!: number;
}
