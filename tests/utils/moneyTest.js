import { formatCurrency } from "../../scripts/utils/money.js";

describe('test suite: formatCurrency', () => {
  it('works with whole numbers', () => {
    expect(formatCurrency(1234)).toEqual('12.34')
  })

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00')
  })

  it('can round up', () => {
    expect(formatCurrency(2009.89)).toEqual('20.10')
  })
})