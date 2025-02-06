<p align="center">
  <img src="https://github.com/tobua/early-return/raw/main/logo.png" alt="early-return" width="30%">
</p>

# early-return

Helper to facilitate early returns across function stack in JavaScript.

```ts
import { early, earlyReturn } from 'early-return'

function handler() {
    early(1, true) // Will return, value 1.
    early(2, false) // Will be skipped, no value.
    early(3) // Will return, value 3.
}

const value = earlyReturn(handler)
```

This plugin is especially useful when integrated directly into frameworks, so that the overhead of wrapping functions isn't necessary. The following example shows how it simplifies JSX components.

```tsx
function MyComponent() {
    if (Store.loading) {
        return <p>Loading...</p>
    }
    if (Store.error) {
        return <p>Error!</p>
    }
    return <p>Hello World!</p>
}
```

```tsx
function MyComponent() {
    early(<p>Loading...</p>, Store.loading)
    early(<p>Error!</p>, Store.error)
    return <p>Hello World!</p>
}
```

Most importantly `early` can also be called in nested methods forcing the execution of all earlier methods to stop as well.
