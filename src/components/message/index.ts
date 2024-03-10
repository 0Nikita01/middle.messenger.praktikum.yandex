import Block from '../../utils/Block';
import template from './message.hbs';
import { getValidFormData } from '../../utils/inputsValidate';

interface MessageProps {
  openModal?: (modalType: string) => void
}

export default class Message extends Block {
  constructor(props: MessageProps) {
    super({
      ...props,
      menuItems: [
        {
          type: 'attach',
          text: 'Фото или Видео',
          img: '/icons/picture.svg',
          modal: 'picture',
        },
        {
          type: 'attach',
          text: 'Файл',
          img: '/icons/file.svg',
          modal: 'file',
        },
        {
          type: 'attach',
          text: 'Локация',
          img: '/icons/location.svg',
          mod: '_rotate45',
          modal: 'location',
        },
      ],
      hideContext: true,
      onContextItemClick: (event: any) => {
        const modalType: string | null = event.target.getAttribute('current-modal');

        if (modalType) {
          this.props.openModal(modalType);
        }
      },
      events: {
        click: (event: any) => {
          if (event.target.getAttribute('contextmenu') === 'selectAttachment') {
            this.props.hideContext = !this.props.hideContext;
          }
        },
        submit: (event: any) => {
          event.preventDefault();
          event.stopImmediatePropagation();
          const data = getValidFormData(event, 'message');

          if (data) {
            console.log(data);
          }
        },
      },

    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
