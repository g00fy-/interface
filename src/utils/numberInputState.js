import { BigNumber } from '@ethersproject/bignumber'
import { formatUnits } from '@ethersproject/units'

import { parseStringToBigNumber } from '@bignumber/parseStringToBigNumber'


/**
 * A curried function for representing user inputted number values.
 * Can be used to show errors in the UI, as well as safely interacting with the blockchain
 * @param {number} precision
 * @param {BigNumber} fallback
 * @return {function}
 */
export function numberInputStateCreator(precision, fallback) {
  /**
   * Transforms a user inputted string into a more verbose format including BigNumber representation
   * @param {string} inputValue
   * @return {NumberInputState}
   */
  return function createNumberInputState(inputValue) {
    if (BigNumber.isBigNumber(inputValue)) {
      return {
        isEmpty: false,
        isValid: true,
        precision,
        valueRaw: formatUnits(inputValue, precision),
        valueSafe: inputValue.toString(),
      }
    } else {
      const { value: valueSafe, isFallback } = parseStringToBigNumber(
        inputValue,
        precision,
        fallback,
      )
      return {
        isEmpty: inputValue === '',
        isValid: !isFallback,
        precision,
        valueRaw: inputValue,
        valueSafe: valueSafe.toString(),
      }
    }
  }
}
