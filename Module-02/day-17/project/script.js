function createLoyalty(earnRule = etb => Math.floor(etb / 10)) {
  let points = 0;

  return {
    earn(etb) {
      points += earnRule(etb);
    },
    redeem(p) {
      points = Math.max(0, points - p);
    },
    balance() {
      return points;
    }
  };
}

const card1 = createLoyalty();
card1.earn(250);
console.log(card1.balance());
card1.redeem(10);
console.log(card1.balance());
card1.redeem(50);
console.log(card1.balance());

const holidayRule = etb => Math.floor(etb / 10) * 2;
const card2 = createLoyalty(holidayRule);
card2.earn(250);
console.log(card2.balance());