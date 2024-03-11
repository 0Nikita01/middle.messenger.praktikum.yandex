import LoginPage from '../pages/login';
import RegisterPage from '../pages/registration';
import ChatsPage from '../pages/chats';
import Profile from '../pages/profile';
import EditPassword from '../pages/editPassword';

const ROUTES = {
  login: LoginPage,
  signup: RegisterPage,
  chats: ChatsPage,
  profile: Profile,
  editPassword: EditPassword,
};

export default function render(name: keyof typeof ROUTES) {
  const root = document.querySelector('#root')!;

  root.innerHTML = '';

  const Page = ROUTES[name];

  const page = new Page();

  root.append(page.getContent()!);

  page.dispatchComponentDidMount();
}
