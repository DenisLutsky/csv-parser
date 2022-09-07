import { IsEmail, IsString, MinLength } from 'class-validator';
import { Trim } from 'src/shared/decorators';

export class AuthDto {
  @IsEmail()
  public email!: string;

  @IsString()
  @MinLength(6)
  @Trim()
  public password!: string;
}
