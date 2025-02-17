import Router from "../utils/Router";
import AuthApi, { signUpData, signInData } from "../api/AuthApi";
import store from "../utils/Store";
import { ROUTES } from "../index";

export class AuthController {
    private api: AuthApi;

    constructor() {
        this.api = new AuthApi();
    }

    async login(data: signInData) {
        try {
            await this.api.signin(data)
            .then(response => {
                console.log(response);
            })
            await this.fetchUser();

            Router.go('/messenger');
        } catch(error) {
            console.error(error);
        }
        
    }

    async regester(data: signUpData) {
        try {
            await this.api.signup(data)
            .then(response => {
                console.log(response)
            })
            
            //Router.go('/messenger');
        } catch(error) {
            console.error(error);
        }
    }

    async switchToSignIn() {
        try {
            Router.go('/');
        } catch(error) {
            console.error(error);
        }
    }

    async switchToSignUp() {
        try {
            Router.go('/sign-up');
        } catch(error) {
            console.error(error);
        }
    }

    async logout() {
        try {
            await this.api.logout();
            localStorage.removeItem('user');

            Router.go('/');
            window.location.reload();
        } catch(error) {
            console.error(error);
        }
    }

    async fetchUser() {
        try {
            const user = await this.api.read();
            localStorage.setItem('user', JSON.stringify(user));
            store.set('user', user);
            
        } catch(error) {
            console.error(error);
        }
    }

}

export default new AuthController();