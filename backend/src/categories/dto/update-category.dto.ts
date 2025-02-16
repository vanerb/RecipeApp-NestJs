import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, IsUUID } from 'class-validator';

export class UpdateCategoryDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    userId: string;
}
