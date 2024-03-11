import Block from '../../utils/Block';
import template from './chat.hbs';

type ChatProps = Record<string, string | number>;

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
