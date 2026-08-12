'use strict';

const subtotal = (...prices) =>
  prices.reduce((sum, p) => sum + p, 0);

const discountBy = rate => n => n * (1 - rate);

const withVat = n => n * 1.15;

const toETB = n => `${n.toFixed(2)} ETB`;

function makeReceiptMaker() {
  let orderNo = 0;
  const memberOff = discountBy(0.10);

  return function (...items) {
    orderNo++;
    const gross = subtotal(...items);
    const net = withVat(memberOff(gross));
    return `#${orderNo}: ${toETB(net)}`;
  };
}