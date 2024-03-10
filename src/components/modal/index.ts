import template from './modal.hbs';
import Block from '../../utils/Block';

interface ModalProps {
  type: string,
  text: string,
  hidden?: boolean,
  mod?: string,
  onnClick?: () => void;
  events: {
    click: () => void;
  };
}

export default class Modal extends Block {
  constructor(props: ModalProps) {
    super({
      ...props,
      events: {
        click: props.onnClick,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
