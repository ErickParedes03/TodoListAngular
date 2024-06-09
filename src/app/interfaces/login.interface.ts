export interface LoginRequestI{
    username: string;
    password: string;
}

export interface LoginResponseI{
    data: {
        id?: string;
        username?: string;
        email?: string;
    },
    message?: string;
}