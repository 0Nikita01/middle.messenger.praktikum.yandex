import Block from '../../utils/Block';
import template from './input.hbs';

type InputProps = Record<string, unknown>;

export default class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
        focusout: props.onBlur,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
