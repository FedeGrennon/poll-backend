import { IsEmail, IsString, Matches } from 'class-validator';

export class SignUpDto
{
    @IsEmail()
    email: string;
    @IsString()
    username: string;
    @Matches(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,12}$/, { message: 'Password too weak' })
    password: string;
}