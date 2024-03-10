import Block from '../../utils/Block';
import template from './input.hbs';

interface InputProps {
  mod?: string,
  label: string,
  type: string,
  name: string,
  placeholder?: string,
  value?: string,
  img?: string,
  error?: string,
  errorLabel?: string,
  onClick?: () => void;
  onBlur?: (event: any) => void;
  events: {
    click: () => void;
    focusout: () => void
  };
}

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
