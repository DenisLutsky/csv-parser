import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { Trim } from 'src/shared/decorators';

export class AuthDto {
  @IsEmail()
  @ApiProperty()
  public email!: string;

  @IsString()
  @MinLength(6)
  @Trim()
  @ApiProperty()
  public password!: string;
}
