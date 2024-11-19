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

test('Inline return with condition.', () => {
  let count = 0
  const value = earlyReturn(() => {
    count += 1
    early('skip', false)
    count += 1
    early('success', true)
    count += 1
  })

  expect(value).toBe('success')
  expect(count).toBe(2)
})

test('Works on nested functions through the call stack.', () => {
  let count = 0
  function nested() {
    count += 1
    early('skip', false)
    early('success', true)
    count += 1
  }
  const value = earlyReturn(() => {
    count += 1
    early('skip', false)
    nested()
    count += 1
  })

  expect(value).toBe('success')
  expect(count).toBe(2)
})
