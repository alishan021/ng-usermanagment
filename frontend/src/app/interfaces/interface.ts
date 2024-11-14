
export interface User {
    _id: number,
    username: string,
    email: string,
    password: string,
    isAdmin: boolean
}

export interface RegisterUser {
    username: string,
    email: string,
    password: string
}

export interface LoginUser {
    username: string,
    password: string
}

export interface JSONResult {
    result: boolean,
    msg: string,
    data: any
}