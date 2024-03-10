import './button.sass';

import Block from '../../utils/Block';
import template from './button.hbs';

interface ButtonProps {
  text: string
  type: string,
  mod?: string,
  page?: string
  onClick?: () => void;
  events: {
    click: () => void
  }
}

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
