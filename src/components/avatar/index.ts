import Block from '../../utils/Block';
import template from './avatar.hbs';

interface AvatarProps {
  src: string,
  name: string,
  size: string,

}

export default class Avatar extends Block {
  constructor(props: AvatarProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
