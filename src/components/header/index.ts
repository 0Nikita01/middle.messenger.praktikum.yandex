import Block from '../../utils/Block';
import template from './header.hbs';

interface HeaderProps {
  avatar?: boolean,
  text?: string,
  menu?: string,
  openModal?: (modalType: string) => void
}

export default class Header extends Block {
  constructor(props: HeaderProps) {
    super({
      ...props,
      menuItems: [
        {
          type: 'header',
          text: 'Добавить пользователя',
          img: '/icons/plus.svg',
          modal: 'addUser',
        },
        {
          type: 'header',
          text: 'Удалить пользователя',
          img: '/icons/plus.svg',
          mod: '_rotate45',
          modal: 'deleteUser',
        },
      ],
      onClick: (event: any) => {
        // console.log(event.target.getAttribute('current-modal'));
        const modalType: string | null = event.target.getAttribute('current-modal');

        if (modalType) {
          this.props.openModal(modalType);
        }
      },
      hideContext: true,
      events: {
        click: (event: any) => {
          if (event.target.className.includes('menu')) {
            this.props.hideContext = !this.props.hideContext;
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
