import { describe, it, expect } from "vitest";
import { renderToString } from "../src/ssr.js";
import { createElement } from "../src/element.js";
import { Component } from "../src/component.js";

describe("renderToString", () => {
  it("should render a simple div", () => {
    const element = createElement("div", { id: "test" }, "Hello");
    const html = renderToString(element);
    expect(html).toBe('<div id="test">Hello</div>');
  });

  it("should render components", () => {
    class Hello extends Component {
      render() {
        return createElement("h1", null, `Hello ${this.props.name}`);
      }
    }
    const element = createElement(Hello, { name: "World" });
    const html = renderToString(element);
    expect(html).toBe("<h1>Hello World</h1>");
  });
});
