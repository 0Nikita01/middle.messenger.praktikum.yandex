import Block from '../../utils/Block';
import template from './profile.hbs';
import render from '../../utils/render';
import { checkingFieldValidation, getValidFormData } from '../../utils/inputsValidate';

export default class Profile extends Block {
  constructor() {
    super({
      inputsMain: [
        {
          type: 'text',
          name: 'first_name',
          value: 'Никита',
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
      buttons: [
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
            render('editPassword');
          },
        },
        {
          type: 'link',
          text: 'Выйти',
          mod: '_mg0',
          onClick: (event: any) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            render('login');
          },
        },
      ],
      openChats: (event: any) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        render('chats');
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
        const data = getValidFormData(event, ...names);

        if (data) {
          console.log(data);
        }
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
