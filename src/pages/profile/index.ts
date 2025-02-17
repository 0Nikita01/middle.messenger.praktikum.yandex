import Block from '../../utils/Block';
import template from './profile.hbs';
import render from '../../utils/render';
import { checkingFieldValidation, getValidFormData } from '../../utils/inputsValidate';
import AuthController from '../../controllers/AuthController';
import ChatsController from '../../controllers/ChatController';
import SettingsController from '../../controllers/SettingsController';
import store, { connect } from '../../utils/Store';
import { userData } from '../../api/UserApi';
import { Indexed } from '../../helpers/set';
import { Context } from 'vm';

const Inputs = {
  inputsMain: [
    {
      type: 'text',
      name: 'first_name',
      value: 'Сергей',
      mod: '-main',
      placeholder: 'Имя',
      error: '_error',
      errorLabel: 'Ошибка',
      onBlur: (event: any) => {
        const input: HTMLInputElement = event.target;
        checkingFieldValidation(input, 'first_name');
      },
    },
    {
      type: 'text',
      name: 'second_name',
      value: 'Масаев',
      mod: '-main',
      placeholder: 'Фамилия',
      error: '_error',
      errorLabel: 'Ошибка',
      onBlur: (event: any) => {
        const input: HTMLInputElement = event.target;
        checkingFieldValidation(input, 'second_name');
      },
    },
  ],
  inputsDetails: [
    {
      label: 'Электронная почта',
      type: 'email',
      name: 'email',
      value: 'test@mail.ru',
      mod: '-secondary',
      error: '_error',
      errorLabel: 'Ошибка',
      onBlur: (event: any) => {
        const input: HTMLInputElement = event.target;
        checkingFieldValidation(input, 'email');
      },
    },
    {
      label: 'Логин',
      type: 'text',
      name: 'login',
      value: 'admin',
      mod: '-secondary',
      error: '_error',
      errorLabel: 'Ошибка',
      onBlur: (event: any) => {
        const input: HTMLInputElement = event.target;
        checkingFieldValidation(input, 'login');
      },
    },
    {
      label: 'Имя в чате',
      type: 'text',
      name: 'display_name',
      value: 'admin',
      mod: '-secondary',
    },
    {
      label: 'Телефон',
      type: 'tel',
      name: 'phone',
      value: '+79099673030',
      mod: '-secondary',
      error: '_error',
      errorLabel: 'Ошибка',
      onBlur: (event: any) => {
        const input: HTMLInputElement = event.target;
        checkingFieldValidation(input, 'phone');
      },
    },
    {
      label: 'Дополнительный email',
      type: 'text',
      name: 'additional_email',
      value: 'second_mail@mail.ru',
      mod: '-secondary',
    },
  ],
}

const buttons = [
  {
    type: 'link',
    text: 'Сохранить',
    mod: '_mg0',
  },
  {
    type: 'link',
    text: 'Изменить пароль',
    mod: '_mg0',
    onClick: (event: any) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      SettingsController.settingsPassword();
      //render('editPassword');
    },
  },
  {
    type: 'link',
    text: 'Выйти',
    mod: '_mg0',
    onClick: (event: any) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      AuthController.logout();
      //render('login');
    },
  },
]

class Profile extends Block {
  constructor() {
    super({
      openChats: (event: any) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        this.ChatsController.chats();
        //render('chats');
      },
      onSubmit: (event: any) => {
        event.preventDefault();
        event.stopImmediatePropagation();

        const names: string[] = [
          'email',
          'login',
          'first_name',
          'second_name',
          'phone',
        ];
        const data = getValidFormData<userData>(event, ...names);

        if (data) {
          console.log('start')
          SettingsController.updateProfile(data);
        }
      },
    });
  }

  init(): void {
    const user = localStorage.getItem('user');
    console.log(user);
    if (user) {
      const userData = JSON.parse(user);
      
      this.setProps({user: userData, buttons});
    }
  }

  getInputsProps() {
    const user = localStorage.getItem('user');
    
    if (user) {
      const userData = JSON.parse(user);
      //console.log(userData)
      const Inp = Object.keys(Inputs).reduce((acc, key) => {
        return {
          ...acc,
          [key]: Inputs[key as keyof typeof Inputs].map(obj => {
            return {...obj, value: userData[obj.name]}
          })
        } 
      }, {});
      
      return Inp;
    }

    return {};
  }

  ChatsController = new ChatsController();

  render() {
    //console.log('render', this.props);
    return this.compile(template, {...this.props, ...this.getInputsProps()});
  }
}

const ProfileWithUser = connect(state => {
    //console.log('connect', this);
    return {user: state.user}
})

export default ProfileWithUser(Profile);
