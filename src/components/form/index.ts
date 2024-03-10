import Block from '../../utils/Block';
import template from './form.hbs';

interface FromProps {
  onSubmit: () => void
}

export default class Form extends Block {
  constructor(props: FromProps) {
    super({
      events: {
        submit: props.onSubmit,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
