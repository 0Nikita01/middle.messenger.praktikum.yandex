import Block from '../../utils/Block';
import template from './container.hbs';

export default class Container extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
