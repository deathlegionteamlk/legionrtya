<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=3,8,15&height=220&section=header&text=legionrtya&fontSize=78&fontColor=ffffff&fontAlignY=38&desc=A%20declarative%20UI%20library%20for%20JavaScript&descAlignY=60&descSize=20&animation=fadeIn" width="100%"/>

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=20&duration=2800&pause=900&color=38BDF8&center=true&vCenter=true&multiline=true&width=680&height=80&lines=Write+components.+Declare+your+UI.+Ship+it.;JSX+support.+Server-side+rendering.+Hooks.;Built+for+web+%26+native+apps." alt="Typing animation"/>

<br/><br/>

[![npm](https://img.shields.io/npm/v/legionrtya?style=for-the-badge&logo=npm&logoColor=white&color=38bdf8)](https://www.npmjs.com/package/legionrtya)
[![License: MIT](https://img.shields.io/badge/License-MIT-6366f1?style=for-the-badge)](./LICENSE)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/legionrtya?style=for-the-badge&color=22c55e&label=minzipped)](https://bundlephobia.com/package/legionrtya)
[![Built by](https://img.shields.io/badge/💀-Death%20Legion%20Team-1a1a1a?style=for-the-badge)](https://github.com/deathlegionteamlk)

</div>

---

## 🤔 What is legionrtya?

It's a UI library. You describe what your interface should look like at any given state, and legionrtya figures out what actually needs to change in the DOM to get there. You don't write "find this element and update its text" — you write "when this data is true, the UI looks like this," and the library handles the rest.

The component model is the same one that's become standard across the frontend ecosystem: self-contained pieces of UI that own their state, accept props from their parents, and render predictably. Stack them together and you have an application.

If you've used React, the API will feel familiar. That's intentional — legionrtya follows the same mental model with a smaller footprint, built by the Death Legion Team.

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212284158-e840e285-664b-44d7-b79b-e264b5e54825.gif" width="400"/>
</div>

---

## ✨ Core concepts

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212257467-871d32b7-e401-42e8-a166-fcfd7baa4c6b.gif" width="80"/>
</div>

<table>
<tr>
<td width="50%">

### 🧩 Component-based
Every piece of your UI is a component. It manages its own state, receives data through props, and renders a consistent output. Components compose — build small ones, assemble them into bigger ones.

### 📝 Declarative rendering
Tell legionrtya what the UI should look like, not how to get there. When state changes, the library diffs the virtual DOM and applies only the updates that are actually needed.

### ⚡ JSX support
Write your markup directly in JavaScript using JSX syntax. It compiles down to `createElement` calls, so there's no runtime cost — just a cleaner way to express your component tree.

</td>
<td width="50%">

### 🖥️ Server-side rendering
Render components on the server via Node.js and send HTML down the wire. Faster first paint, better SEO, same component code running in both environments.

### 🪝 Hooks
`useState`, `useEffect`, and the rest of the hooks API let you manage state and side effects in function components without writing a class.

### 🌐 Web & native
The core is environment-agnostic. Target the browser DOM, server-rendered HTML, or a native rendering layer — the component model stays the same.

</td>
</tr>
</table>

---

## 📦 Install

```bash
npm install legionrtya
```

```bash
yarn add legionrtya
```

```bash
pnpm add legionrtya
```

---

## 🚀 Usage

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212257454-16e3712e-945a-4ca2-b238-408ad0bf87e6.gif" width="80"/>
</div>

### Function component with hooks

The most common pattern. `useState` gives you local state; the component re-renders when it changes.

```javascript
import { useState } from 'legionrtya';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

---

### Class component

If you prefer the class API or are migrating from an older codebase, class components work the same way.

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

---

### Composing components

Build small, combine big. Props flow down; events bubble up.

```javascript
import { useState } from 'legionrtya';

function UserCard({ name, role }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <span>{role}</span>
    </div>
  );
}

function App() {
  const [users] = useState([
    { id: 1, name: 'Commander', role: 'Admin' },
    { id: 2, name: 'Warrior',   role: 'Member' },
  ]);

  return (
    <div>
      {users.map(u => (
        <UserCard key={u.id} name={u.name} role={u.role} />
      ))}
    </div>
  );
}
```

---

### Side effects with `useEffect`

Fetch data, subscribe to events, interact with external APIs — anything that happens *around* a render goes in `useEffect`.

```javascript
import { useState, useEffect } from 'legionrtya';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []); // empty array = run once on mount

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}
```

---

### Server-side rendering

Same components, different environment. Render to an HTML string on the server and hydrate on the client.

```javascript
import { renderToString } from 'legionrtya/server';
import App from './App';

const html = renderToString(<App />);

// Send it down as part of your HTML response
res.send(`
  <!DOCTYPE html>
  <html>
    <body>
      <div id="app">${html}</div>
    </body>
  </html>
`);
```

---

## 🏗️ How it works

```
Your JSX
   │
   ▼
createElement() calls
   │
   ▼  
Virtual DOM tree  ──── diffing ────▶  only changed nodes update
   │                                        │
   ▼                                        ▼
Component state                       Real DOM / SSR string
```

When state changes in a component, legionrtya re-renders that component's virtual tree, diffs it against the previous one, and patches only the nodes that actually changed. The rest of the DOM stays untouched.

---

## 📋 API reference

### Core

| Export | What it does |
|---|---|
| `createElement(type, props, ...children)` | Creates a virtual DOM element |
| `render(element, container)` | Mounts a component tree into a real DOM node |
| `Component` | Base class for class components |
| `Fragment` | Groups children without a wrapper DOM node |

### Hooks

| Hook | What it does |
|---|---|
| `useState(initial)` | Local state with a setter function |
| `useEffect(fn, deps)` | Side effects after render |
| `useContext(ctx)` | Read from a context |
| `useRef(initial)` | Mutable ref that persists across renders |
| `useMemo(fn, deps)` | Memoize an expensive computation |
| `useCallback(fn, deps)` | Memoize a function reference |

### Server

| Export | What it does |
|---|---|
| `renderToString(element)` | Render a tree to an HTML string (Node.js) |
| `renderToStaticMarkup(element)` | Like `renderToString` but without hydration attributes |

---

## ⚙️ JSX setup

Add this to your Babel config to compile JSX with legionrtya:

```json
{
  "presets": [
    ["@babel/preset-react", {
      "pragma": "legionrtya.createElement",
      "pragmaFrag": "legionrtya.Fragment"
    }]
  ]
}
```

Or in a `vite.config.js`:

```javascript
import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    jsxFactory: 'legionrtya.createElement',
    jsxFragment: 'legionrtya.Fragment',
  },
});
```

---

## 🤝 Contributing

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="400"/>
</div>

Issues and PRs welcome. For anything significant, open an issue first.

```bash
git clone https://github.com/deathlegionteamlk/legionrtya.git
cd legionrtya
npm install
npm test
```

---

## 🛡️ License

MIT © [Death Legion Team](https://github.com/deathlegionteamlk)

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=3,8,15&height=100&section=footer&animation=fadeIn" width="100%"/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=13&duration=4000&pause=1000&color=38BDF8&center=true&vCenter=true&width=520&lines=Declare+it.+Render+it.+Ship+it.;Components+all+the+way+down.;💀+Built+by+Death+Legion+Team." alt="Footer typing"/>

</div>
