import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsString()
  readonly name: string;
  @IsEmail()
  readonly email: string;
  @MinLength(8)
  readonly password: string;
}
