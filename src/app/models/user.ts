export interface IAuthUser {
    login: string;
    password: string
}
export interface IRegistrationUser extends IAuthUser {
    email?: string;
}

export interface IAuthUserRes extends IAuthUser {}