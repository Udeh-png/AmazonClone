import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import isWeekend from "../../scripts/utils/No-Weekend.js";

export const deliveryOptions = [
{
  id: '1',
  deliveryDate: 7,
  priceCents: 0,
},
{
  id: '2',
  deliveryDate: 3,
  priceCents: 499,
},
{
  id: '3',
  deliveryDate: 1,
  priceCents: 999,
}
]

export function getDeliveryOptionWithId(deliveryOptionId) {
  let matchingDeliveryOption;

  deliveryOptions.forEach((deliveryOption) => {
    if (deliveryOptionId === deliveryOption.id) {
      matchingDeliveryOption = deliveryOption;
    }
  });
  return matchingDeliveryOption;
}

export function calculateDeliveryDate(cartDaysToAdd) {
  let today = dayjs();
  let daysToAdd = cartDaysToAdd;
  let count = 0;

  while (count < daysToAdd) {
    today = today.add(1, 'Days');
    const weekendCheck = today.format('dddd');

    if (!isWeekend(weekendCheck)) {
      count++;
    }
  }
  return today.format('dddd, MMMM D');
}