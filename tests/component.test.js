/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from "vitest";
import { createElement, Component, render } from "../src/index.js";

describe("Component and Reconciler", () => {
  it("should render a component to the DOM", () => {
    const container = document.createElement("div");
    class App extends Component {
      render() {
        return createElement("div", { id: "app" }, "Hello World");
      }
    }
    
    render(createElement(App), container);
    
    // Since our reconciler is asynchronous (using requestIdleCallback), 
    // we might need to wait or mock it to be synchronous for testing.
    // Our mock above makes it synchronous enough for this test if we call it correctly.
    
    expect(container.innerHTML).toBe('<div id="app">Hello World</div>');
  });

  it("should update state and re-render", () => {
    const container = document.createElement("div");
    let instance;
    class Counter extends Component {
      constructor(props) {
        super(props);
        this.state = { count: 0 };
        instance = this;
      }
      render() {
        return createElement("div", null, String(this.state.count));
      }
    }

    render(createElement(Counter), container);
    expect(container.innerHTML).toBe("<div>0</div>");

    instance.setState({ count: 1 });
    expect(container.innerHTML).toBe("<div>1</div>");
  });
});
