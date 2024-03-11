import Block from '../../utils/Block';
import template from './profilelink.hbs';

type ProfileLinkProps = Record<string, unknown>;

export default class ProfileLink extends Block {
  constructor(props: ProfileLinkProps) {
    super({
      ...props,
      btnClick: props.onClick,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
