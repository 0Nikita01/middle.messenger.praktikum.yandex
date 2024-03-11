import Block from '../../utils/Block';
import template from './registration.hbs';
import render from '../../utils/render';
import { getValidFormData, checkingFieldValidation } from '../../utils/inputsValidate';

export default class RegisterPage extends Block {
  constructor() {
    super({
      inputs: [
        {
          label: 'Почта',
          type: 'email',
          name: 'email',
          mod: '_modal',
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
          mod: '_modal',
          error: '_error',
          errorLabel: 'Ошибка',
          onBlur: (event: any) => {
            const input: HTMLInputElement = event.target;
            checkingFieldValidation(input, 'login');
          },
        },
        {
          label: 'Имя',
          type: 'text',
          name: 'first_name',
          mod: '_modal',
          error: '_error',
          errorLabel: 'Ошибка',
          onBlur: (event: any) => {
            const input: HTMLInputElement = event.target;
            checkingFieldValidation(input, 'first_name');
          },
        },
        {
          label: 'Фамилия',
          type: 'text',
          name: 'second_name',
          mod: '_modal',
          error: '_error',
          errorLabel: 'Ошибка',
          onBlur: (event: any) => {
            const input: HTMLInputElement = event.target;
            checkingFieldValidation(input, 'second_name');
          },
        },
        {
          label: 'Телефон',
          type: 'tel',
          name: 'phone',
          mod: '_modal',
          error: '_error',
          errorLabel: 'Ошибка',
          onBlur: (event: any) => {
            const input: HTMLInputElement = event.target;

            checkingFieldValidation(input, 'phone');
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
        {
          label: 'Пароль (еще раз)',
          type: 'password',
          name: 'second_password',
          mod: '_modal',
        },
      ],
      buttons: [
        {
          text: 'Зарегистрироваться',
          type: 'submit',
          mod: '_mg47',
        },
        {
          text: 'Войти',
          type: 'link',
          onClick: (event: any) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            render('login');
          },
        },
      ],
      onSubmit: (event: any) => {
        event.preventDefault();
        event.stopImmediatePropagation();

        const names: string[] = [
          'email',
          'login',
          'first_name',
          'second_name',
          'phone',
          'password',
        ];
        const data = getValidFormData(event, ...names);

        if (data) {
          console.log(data);
        }
        render('chats');
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
