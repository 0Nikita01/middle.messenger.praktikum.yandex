import { userData } from "../api/UserApi";
import UserApi from "../api/UserApi";
import Router from "../utils/Router";
import AuthController from "./AuthController";


export class SettingsController {
    private api: UserApi;

    constructor() {
        this.api = new UserApi();
    }

    async updateProfile(data: userData) {
        await this.api.changeUserData(data);

        await this.fetchUser();
    }

    async updatePassword(data: userData) {
        await this.api.changeUserPassword(data);    
    }

    async fetchUser() {
        return await AuthController.fetchUser();
    }

    async userSettings() {
        try {
            Router.go('/settings');
        } catch(error) {
            console.error(error);
        }
        
    }

    async settingsPassword() {
        try {
            Router.go('/settings-password');
        } catch(error) {
            console.error(error);
        }
        
    }

}

export default new SettingsController();