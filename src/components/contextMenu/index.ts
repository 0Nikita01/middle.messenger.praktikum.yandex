import Block from '../../utils/Block';
import template from './contextMenu.hbs';

interface ContextMenuProps {
  items: Array<any>,
  onClick?: () => void,
  events: {
    click: () => void
  }
}

export default class ContextMenu extends Block {
  constructor(props: ContextMenuProps) {
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
