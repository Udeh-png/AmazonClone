import { calculateDeliveryDate } from "../../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
describe('test suite: calculateDeliveryDate', () => {
  
  it('it gets the correct day', () => {
    expect(
      calculateDeliveryDate(2, dayjs('2-5-2025'))
    ).toEqual('Friday, February 7');
  });

  it('it skips the weekends', () => {
    expect(
      calculateDeliveryDate(4, dayjs('2-5-2025'))
    ).toEqual('Tuesday, February 11');
  });

  it('it works with 0', () => {
    expect(
      calculateDeliveryDate(0, dayjs('2-5-2025'))
    ).toEqual('Wednesday, February 5');
  });


});