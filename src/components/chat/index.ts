import Block from '../../utils/Block';
import template from './chat.hbs';

interface ChatProps {
  name: string,
  preview: string,
  avatar: string,
  lastTime: string,
  counter: number
}

export default class Chat extends Block {
  constructor(props: ChatProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
