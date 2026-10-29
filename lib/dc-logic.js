// Small state container the page logic is written against.
// setState updates synchronously and asks the React host to re-render.
export class DCLogic {
  constructor(props) {
    this.props = props || {};
    this.state = {};
    this.__notify = null;
  }
  setState(update, cb) {
    const next = typeof update === 'function' ? update(this.state, this.props) : update;
    if (!next) return;
    this.state = Object.assign({}, this.state, next);
    if (this.__notify) this.__notify();
    if (cb) cb();
  }
}
