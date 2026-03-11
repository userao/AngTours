export type FormErr = {
    [key: string]: boolean;
}

export type FormErrMsg = {
    [key: string]: string;
}

export type User = {
    login: string;
    password: string;
}