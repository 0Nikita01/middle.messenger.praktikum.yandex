import BaseAPI from "./BaseApi";
import { userData } from "./UserApi";

export interface signUpData {
    email: string,
    login: string,
    first_name: string,
    second_name: string,
    phone: string,
    password: string,
}

export interface signInData {
    login: string,
    password: string
}

export default class AuthApi extends BaseAPI {
    constructor() {
        super('/auth');
    }

    signup(data: signUpData) {
        return this.http.post('/signup', {data});
    }

    signin(data: signInData) {
        return this.http.post('/signin', {data});
    }

    logout() {
        return this.http.post('/logout');
    }

    read(): Promise<userData> {
        return this.http.get('/user');
    }

    
}
