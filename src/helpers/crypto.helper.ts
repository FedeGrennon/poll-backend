import { hashSync, compareSync } from 'bcrypt';

const SALT_ROUNDS = 10;

export const Hash = (payload: string): string =>
{
    return hashSync(payload, SALT_ROUNDS);
}

export const Compare = (payload: string, hash: string): boolean =>
{
    return compareSync(payload, hash);
}