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

test('Regular return values are also considered.', () => {
  let count = 0
  const value = earlyReturn(() => {
    count += 1
    early('skip', false)
    count += 1
    return count
  })

  expect(value).toBe(2)
  expect(count).toBe(2)
})

test('Regulaly thrown errors are propagated.', () => {
  let count = 0
  let thrownError: any

  try {
    earlyReturn(() => {
      count += 1
      throw new Error('Regular Error')
      // biome-ignore lint/correctness/noUnreachable: For testing purposes.
      count += 1
      return count
    })
  } catch (_error: any) {
    thrownError = _error
  }

  expect(count).toBe(1)
  expect(thrownError).toBeDefined()
})
