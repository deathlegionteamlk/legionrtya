import { updateComponent } from "./reconciler.js";

export class Component {
  constructor(props) {
    this.props = props;
    this.state = this.state || {};
  }

  setState(partialState) {
    this.state = {
      ...this.state,
      ...partialState,
    };
    updateComponent(this);
  }

  render() {
    throw new Error("Component.render() must be implemented");
  }
}
