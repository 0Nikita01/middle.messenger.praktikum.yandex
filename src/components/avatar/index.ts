import Block from '../../utils/Block';
import template from './avatar.hbs';

type AvatarProps = Record<string, string>;

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
