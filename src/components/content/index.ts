import Block from '../../utils/Block';
import template from './content.hbs';

export default class Content extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
