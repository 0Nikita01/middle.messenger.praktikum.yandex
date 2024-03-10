import Block from '../../utils/Block';
import template from './profilelink.hbs';

interface ProfileLinkProps {
  src: string,
  name: string,
  showProfile: string,
  onClick?: () => void;
}

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
