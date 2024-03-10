import template from './chatsblock.hbs';
import Block from '../../utils/Block';

export default class ChatsBlock extends Block {
  constructor() {
    super({
      chatsList: [
        {
          name: 'Николай',
          preview: 'Друзья, у меня для вас особенный выпуск новостей!',
          avatarSrc: '/icons/avatar.png',
          time: '13:58',
          count: 1,
        },
        {
          name: 'Иван',
          preview: 'Так увлёкся работой по курсу, что совсем забыл его анонсировать',
          avatarSrc: '/icons/avatar.png',
          time: '10:34',
          count: 2,
        },
        {
          name: 'Артемий',
          preview: 'Друзья, у меня для вас особенный выпуск новостей!',
          avatarSrc: '/icons/avatar.png',
          time: '09:15',
        },
      ],
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
