# legionrtya

A declarative JavaScript library for building user interfaces.

## Features
- **Component-Based**: Build encapsulated components that manage their own state.
- **Declarative**: Efficiently updates and renders the right components when your data changes.
- **JSX Support**: Write HTML-like code in your JavaScript.
- **Server-Side Rendering**: Render components on the server using Node.js.
- **Versatile**: Foundation for web and native applications.

## Usage

```javascript
import { createElement, render, Component } from 'legionrtya';

class HelloMessage extends Component {
  render() {
    return createElement('div', null, `Hello ${this.props.name}`);
  }
}

render(
  createElement(HelloMessage, { name: 'World' }),
  document.getElementById('app')
);
```

## Built by
Death Legion Team
