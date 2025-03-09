export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
}

export enum UserRole {
    Admin = "admin",
    User = "user"

}