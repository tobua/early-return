let result: any

export const early = (value: any, condition?: boolean) => {
  if (condition || typeof condition === 'undefined') {
    result = value
    throw new Error('early-return')
  }
}

export function earlyReturn(method: Function) {
  result = undefined

  try {
    result = method()
  } catch (_error) {
    // TODO forward otherwise thrown errors.
  }

  const value = result
  result = undefined

  return value
}
