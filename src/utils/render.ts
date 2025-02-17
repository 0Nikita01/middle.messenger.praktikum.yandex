import LoginPage from '../pages/login';
import RegisterPage from '../pages/registration';
import ChatsPage from '../pages/chats';
import Profile from '../pages/profile';
import EditPassword from '../pages/editPassword';
import Block from './Block';

export const ROUTES = {
  login: LoginPage,
  signup: RegisterPage,
  chats: ChatsPage,
  profile: Profile,
  editPassword: EditPassword,
};

export default function render<B extends Block>(name: string, block: B): void {
  const root = document.querySelector(name)!;

  root.innerHTML = '';

  const Page = block;

  root.append(Page.getContent()!);

  Page.dispatchComponentDidMount();
}
