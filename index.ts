let result: any

const errorMessage = 'early-return'

export const early = (value: any, condition?: boolean) => {
  if (condition || typeof condition === 'undefined') {
    result = value
    throw new Error(errorMessage)
  }
}

export function earlyReturn(method: Function) {
  result = undefined

  try {
    result = method()
  } catch (_error: any) {
    if (_error.message !== errorMessage) {
      throw new Error(_error)
    }
  }

  const value = result
  result = undefined

  return value
}
