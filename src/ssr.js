export function renderToString(element) {
  if (element === null || element === undefined) {
    return "";
  }

  if (typeof element === "string" || typeof element === "number") {
    return escapeHtml(String(element));
  }

  const { type, props } = element;

  if (type === "TEXT_ELEMENT") {
    return escapeHtml(props.nodeValue);
  }

  if (typeof type === "function") {
    let renderedElement;
    if (type.prototype && type.prototype.render) {
      // Class component
      const instance = new type(props);
      renderedElement = instance.render();
    } else {
      // Function component
      renderedElement = type(props);
    }
    return renderToString(renderedElement);
  }

  const tag = type;
  const propsString = Object.keys(props)
    .filter(key => key !== "children" && !key.startsWith("on"))
    .map(key => ` ${key}="${escapeHtml(String(props[key]))}"`)
    .join("");

  const childrenString = (props.children || [])
    .map(child => renderToString(child))
    .join("");

  return `<${tag}${propsString}>${childrenString}</${tag}>`;
}

function escapeHtml(str) {
  const entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;",
  };
  return str.replace(/[&<>"'/]/g, s => entityMap[s]);
}
