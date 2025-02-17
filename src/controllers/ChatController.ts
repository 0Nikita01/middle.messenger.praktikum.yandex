import UserApi, { userData } from "../api/UserApi";
import Router from "../utils/Router";
import AuthController from "./AuthController";


export default class ChatsController {
    private api: UserApi;

    constructor() {
        this.api = new UserApi();
    }

    async changeProfile(data: userData) {
        await this.api.changeUserData(data);
        AuthController.fetchUser();
    }

    async chats() {
        try {
            await AuthController.fetchUser();
            Router.go('/messenger');
        } catch(error) {
            console.error(error);
        }
        
    }

}
 