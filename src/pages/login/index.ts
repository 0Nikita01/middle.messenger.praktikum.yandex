import Block from '../../utils/Block';
import template from './login.hbs';
import render from '../../utils/render';
import { getValidFormData, checkingFieldValidation } from '../../utils/inputsValidate';
import AuthController from '../../controllers/AuthController';
import { signInData } from '../../api/AuthApi';

export default class LoginPage extends Block {
  constructor() {
    super({
      inputs: [
        {
          label: 'Логин',
          type: 'text',
          name: 'login',
          mod: '_modal',
          error: '_error',
          errorLabel: 'Ошибка',
          onBlur: (event: any) => {
            const input: HTMLInputElement = event.target;

            checkingFieldValidation(input, 'login');
          },
        },
        {
          label: 'Пароль',
          type: 'password',
          name: 'password',
          mod: '_modal',
          error: '_error',
          errorLabel: 'Ошибка',
          onBlur: (event: any) => {
            const input: HTMLInputElement = event.target;

            checkingFieldValidation(input, 'password');
          },
        },
      ],
      buttons: [
        {
          text: 'Войти',
          type: 'submit',
          mod: '_mg145',
        },
        {
          text: 'Нет аккаунта?',
          type: 'link',
          onClick: (event: any) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            //render('signup');
            AuthController.switchToSignUp();
          },
        },
      ],
      onSubmit: (event: any) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        const names: string[] = [
          'login',
          'password',
        ];
        const data = getValidFormData<signInData>(event, ...names);

        if (data) {
          console.log(data);
          AuthController.login(data);
        }
        //this.AuthController.login(data);
        //render('chats');
      },
    });

  }

  render() {
    return this.compile(template, this.props);
  }
}
