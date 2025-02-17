import Block from '../../utils/Block';
import template from './chats.hbs';
import ChatsController from '../../controllers/ChatController';
import SettingsController from '../../controllers/SettingsController';
import AuthController from '../../controllers/AuthController';
import { connect } from '../../utils/Store';

class ChatsPage extends Block {
  constructor() {
    super({
      modalText: '',
      modalType: 'editChat',
      isModalHide: true,
      modalMod: 'blur',

      openModal: (modalType: string) => {
        this.setProps(this.getNewProps(modalType));
        this.props.isModalHide = !this.props.isModalHide;
      },

      openProfile: (event: any) => {
        event.preventDefault();
        event.stopImmediatePropagation();

        SettingsController.userSettings();

        //render('profile');
      },
    });
  }

  ChatsController = new ChatsController();

  init(): void {
    const user = localStorage.getItem('user');

    if (user) {
      this.setProps({user: JSON.parse(user)});
    }
  }

  getNewProps(modalType: string): typeof this.props {
    let newProps: typeof this.props;

    if (modalType === 'addUser') {
      newProps = {
        ...this.props,
        modalText: 'Добавить пользователя',
        inputs: [{
          label: 'Логин',
          type: 'text',
          name: 'login',
          mod: '_modal',
        }],
        buttons: [{
          text: 'Добавить',
          type: 'submit',
          mod: '_mg0',
          onClick: (event: any) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            this.props.isModalHide = !this.props.isModalHide;
          },
        }],
      };
    }
    if (modalType === 'deleteUser') {
      newProps = {
        ...this.props,
        modalText: 'Вы точно хотите удалить чат?',
        inputs: [],
        buttons: [
          {
            text: 'Отмена',
            type: 'submit',
            mod: '_mg47',
            onClick: (event: any) => {
              event.preventDefault();
              event.stopImmediatePropagation();
              this.props.isModalHide = !this.props.isModalHide;
            },
          },
          {
            text: 'Удалить',
            type: 'link',
            onClick: (event: any) => {
              event.preventDefault();
              event.stopImmediatePropagation();
              this.props.isModalHide = !this.props.isModalHide;
            },
          },
        ],
      };
    }
    if (modalType === 'picture') {
      newProps = {
        ...this.props,
        modalText: 'Выбрать фото',
        inputs: [{
          label: '',
          type: 'file',
          name: 'picture',
          mod: '_modal_file',
        }],
        buttons: [{
          text: 'Загрузить',
          type: 'submit',
          mod: '_mg47',
          onClick: (event: any) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            this.props.isModalHide = !this.props.isModalHide;
          },
        }],
      };
    }
    if (modalType === 'file') {
      newProps = {
        ...this.props,
        modalText: 'Выбрать файл',
        inputs: [{
          label: '',
          type: 'file',
          name: 'file',
          mod: '_modal_file',
        }],
        buttons: [{
          text: 'Загрузить',
          type: 'submit',
          mod: '_mg47',
          onClick: (event: any) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            this.props.isModalHide = !this.props.isModalHide;
          },
        }],
      };
    }
    if (modalType === 'location') {
      newProps = {
        ...this.props,
        modalText: 'Выбрать геопозицию',
        inputs: [],
        buttons: [{
          text: 'Выбрать',
          type: 'submit',
          mod: '_mg47',
          onClick: (event: any) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            this.props.isModalHide = !this.props.isModalHide;
          },
        }],
      };
    }

    return newProps;
  }

  render() {
    //console.log('render chatsPage');
    return this.compile(template, this.props);
  }
}

export default ChatsPage;
