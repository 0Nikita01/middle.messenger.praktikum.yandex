import Handlebars from 'handlebars';
import registerComponent from './utils/registerComponent';
import render from './utils/render';
import Router from './utils/Router';
import AuthController from './controllers/AuthController';

import './style.sass';
import './components/modal/modal.sass';
import './components/form/form.sass';
import './components/input/input.sass';

import './pages/chats/chats.sass';
import './pages/profile/profile.sass';
import './pages/editPassword/editPassword.sass';
import './components/chatsBlock/chatsblock.sass';
import './components/sideBar/sidebar.sass';
import './components/avatar/avatar.sass';
import './components/content/content.sass';
import './components/container/container.sass';
import './components/contextMenu/contextMenu.sass';
import './components/header/header.sass';
import './components/profileLink/profilelink.sass';
import './components/message/message.sass';
import './components/chat/chat.sass';
import './components/feed/feed.sass';
import './components/userMessage/userMessage.sass';

import ModalTemplate from './components/modal/modal.hbs';
import ChatsBlockTemplate from './components/chatsBlock/chatsblock.hbs';
import Container from './components/container/container.hbs';
import SideBar from './components/sideBar/sidebar.hbs';
import Content from './components/content/content.hbs';

import LoginPage from './pages/login';
import ChatsPage from './pages/chats';
import Profile from './pages/profile';
import Input from './components/input';
import Button from './components/button';
import ProfileLink from './components/profileLink';
import Avatar from './components/avatar';
import ContextMenu from './components/contextMenu';
import Header from './components/header';
import Message from './components/message';
import Form from './components/form';
import ChatsBlock from './components/chatsBlock';
import Chat from './components/chat';
import Feed from './components/feed';
import UserMessage from './components/userMessage';
import RegisterPage from './pages/registration';
import EditPassword from './pages/editPassword';

Handlebars.registerPartial('Modal', ModalTemplate);
Handlebars.registerPartial('ChatsBlock', ChatsBlockTemplate);
Handlebars.registerPartial('SideBar', SideBar);
Handlebars.registerPartial('Container', Container);
Handlebars.registerPartial('Content', Content);

registerComponent('LoginPage', LoginPage);
registerComponent('ChatsPage', ChatsPage);
registerComponent('Profile', Profile);
registerComponent('EditPawword', EditPassword);
registerComponent('Form', Form);
registerComponent('Input', Input);
registerComponent('Button', Button);
registerComponent('ProfileLink', ProfileLink);
registerComponent('Avatar', Avatar);
registerComponent('ContextMenu', ContextMenu);
registerComponent('Header', Header);
registerComponent('Message', Message);
registerComponent('ChatsBlock', ChatsBlock);
registerComponent('Chat', Chat);
registerComponent('Feed', Feed);
registerComponent('UserMessage', UserMessage);

export const ROUTES = {
  login: '/',
  chats: '/messenger',
  register: '/sign-up',
  profile: '/settings',
  editpassword: '/settings-password',
}

window.addEventListener('DOMContentLoaded', () => {

  Router
    .use('/', LoginPage)
    .use('/messenger', ChatsPage)
    .use('/sign-up', RegisterPage)
    .use('/settings', Profile)
    .use('/settings-password', EditPassword)
  
  Router.start();

  AuthController.fetchUser();

  const user = localStorage.getItem('user');

  if (user && window.location.pathname == '/') {
    Router.go('/login');
  } else if (!user) {
    Router.go('/');
  }


});
