import { describe, it, expect } from "vitest";
import { createElement } from "../src/element.js";

describe("createElement", () => {
  it("should create a basic element", () => {
    const element = createElement("div", { id: "foo" }, "bar");
    expect(element).toEqual({
      type: "div",
      props: {
        id: "foo",
        children: [
          {
            type: "TEXT_ELEMENT",
            props: {
              nodeValue: "bar",
              children: [],
            },
          },
        ],
      },
    });
  });

  it("should handle nested elements", () => {
    const element = createElement("div", null, createElement("span", null, "test"));
    expect(element.props.children[0].type).toBe("span");
    expect(element.props.children[0].props.children[0].props.nodeValue).toBe("test");
  });
});
