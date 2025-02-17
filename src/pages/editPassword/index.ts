import Block from '../../utils/Block';
import template from './editPassword.hbs';
import render from '../../utils/render';
import { checkingFieldValidation, getValidFormData } from '../../utils/inputsValidate';
import ChatsController from '../../controllers/ChatController';
import SettingsController from '../../controllers/SettingsController';
import { userData } from '../../api/UserApi';

export default class EditPassword extends Block {
  constructor() {
    super({
      inputsMain: [
        {
          type: 'text',
          name: 'first_name',
          value: 'Никита',
          mod: '-main',
          placeholder: 'Имя',
        },
        {
          type: 'text',
          name: 'second_name',
          value: 'Масаев',
          mod: '-main',
          placeholder: 'Фамилия',
        },
      ],

      inputsDetails: [
        {
          label: 'Старый пароль',
          type: 'password',
          name: 'oldPassword',
          mod: '-secondary',
          error: '_error',
          errorLabel: 'Ошибка',
          onBlur: (event: any) => {
            const input: HTMLInputElement = event.target;
            checkingFieldValidation(input, 'oldPassword');
          },
        },
        {
          label: 'Новый пароль',
          type: 'password',
          name: 'newPassword',
          mod: '-secondary ',
          error: '_error',
          errorLabel: 'Ошибка',
          onBlur: (event: any) => {
            const input: HTMLInputElement = event.target;
            checkingFieldValidation(input, 'newPassword');
          },
        },
        {
          label: 'Потвердить новый пароль',
          type: 'password',
          name: 'confirmPassword',
          mod: '-secondary ',
        },
      ],

      buttons: [
        {
          type: 'submit',
          text: 'Сохранить',
          mod: '_mg47',
        },
      ],

      openChats: (event: any) => {
        this.openPage(event, 'chats');
        this.ChatsController.chats()
      },

      onSubmit: (event: any) => {
        event.preventDefault();
        event.stopImmediatePropagation();

        const confirmPassword = event.target.querySelector('[name="confirmPassword"]').value;
        const names: string[] = [
          'oldPassword',
          'newPassword',
        ];
        const data = getValidFormData<userData>(event, ...names);

        if (data && data.newPassword === confirmPassword) {
          console.log(data);

          SettingsController.updatePassword(data);
        }

        SettingsController.userSettings();
        
      },
    });
  }

  ChatsController = new ChatsController()

  openPage(event: any, page: string) { /* eslint class-methods-use-this: 0 */
    event.preventDefault();
    event.stopImmediatePropagation();
    //render(page as 'profile' | 'chats');
  }

  render() {
    return this.compile(template, this.props);
  }
}
