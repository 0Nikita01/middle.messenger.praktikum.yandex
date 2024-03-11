import Block from '../../utils/Block';
import template from './form.hbs';

type FromProps = Record<string, any>;

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
