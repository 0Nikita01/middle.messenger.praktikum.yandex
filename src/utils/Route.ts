import render from "./render";
import Block from "./Block";

export interface BlockConstructable<P = any,> {
    new(props: P): Block<P | any>;
}

export class Route {
    _blockClass: BlockConstructable;
    _block: Block | null;
    rootquery: string;
    _pathname: string;

    constructor(pathname: string, view: BlockConstructable, query: string) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this.rootquery = query;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            //console.log('leave');
            this._block.hide();
            //this._block = null;
        }
    }

    match(pathname: string) {
        return pathname === this._pathname;
    }

    render() {
        //console.log('this block', this._block)
        if (!this._block) {
            this._block = new this._blockClass({});
            render<Block>(this.rootquery, this._block);
            return;
        } else if (this._block) {
            this._block.show();
            render<Block>(this.rootquery, this._block);
            return;
        }
        //console.log('show')
        //this._block.show()
    }
}