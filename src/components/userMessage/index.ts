import Block from '../../utils/Block';
import template from './userMessage.hbs';

interface FeedProps {
  message: string,
  time: string,
  type: 'sent' | 'received',
  status: 'read' | 'delivered'
}

export default class UserMessage extends Block {
  constructor(props: FeedProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
