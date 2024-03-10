import Block from '../../utils/Block';
import template from './sidebar.hbs';

export default class SideBar extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
