import BaseAPI from "./BaseApi";

export interface userData {
    id?: number,
    email: string,
    login: string,
    first_name: string,
    second_name: string,
    phone: string,
    password: string,
    newPassword?: string,
    avatar: string
}


export default class UserApi extends BaseAPI {
    constructor() {
        super('/user');
    }

    changeUserData(data: userData) {
        return this.http.put('/profile', {data});
    }

    changeUserPassword(data: userData) {
        return this.http.put('/password', {data});
    }


    // signup(data: signUpData) {
    //     return this.http.post('/signup', {data});
    // }

    // signin(data: signInData) {
    //     return this.http.post('/signin', {data});
    // }

    // logout() {
    //     return this.http.post('/logout');
    // }

    // read(): Promise<userData> {
    //     return this.http.get('/user');
    // }

    
}