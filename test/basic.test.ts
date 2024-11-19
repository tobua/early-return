import { expect, test } from 'bun:test'
import { early, earlyReturn } from '../index'

test('Regular inline return without condition.', () => {
  let count = 0
  const value = earlyReturn(() => {
    count += 1
    early('hello')
    count += 1
  })

  expect(value).toBe('hello')
  expect(count).toBe(1)
})
