import { formatCurrency } from "../../scripts/utils/money.js";

console.log('test suite: formatCurrency');

console.log(' works with whole numbers');
if (formatCurrency(1229) === '12.29') {
  console.log(' passed');
}else{
  console.log(' failed');
}

console.log(' works with 0');
if (formatCurrency(0) === '0.00') {
  console.log(' passed');
}else{
  console.log(' failed');
}

console.log(' can round up');
if (formatCurrency(2000.5) === '20.01') {
  console.log(' passed');
}else{
  console.log(' failed');
}

console.log(' can round down');
if (formatCurrency(2000.4) === '20.00') {
  console.log(' passed');
}else{
  console.log(' failed');
}