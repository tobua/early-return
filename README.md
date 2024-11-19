# early-return

Helper to facilitate early returns across function stack in JavaScript.

```ts
import { early, earlyReturn } from 'early-return'

earlyReturn(() => {
    const count = 1
    early(1, count === 5)

    //
})
```