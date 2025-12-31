import bcrypt from 'bcrypt';

export function passwordEncryption(password: string): string {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const encripted = bcrypt.hashSync(password, salt);
    return encripted; 
}

export function passwordCompare(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
}

export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}