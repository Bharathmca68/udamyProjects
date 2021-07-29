const {
  calculateTip,
  fahrenheitToCelsius,
  CelsiusTofahrenheit,
} = require("../controllers/math");
const { addition } = require("../controllers/addition");

test("Should calculate with Tip", () => {
  const total = calculateTip(10, 0.3);

  if (total !== 13) {
    throw new Error(`total tip should be 13. got ${total}`);
  }
});

test("Should able to add two numbers", () => {
  const total = addition(10, 10);
  expect(total).toBe(20);
  //   if (total !== 30) {
  //     throw new Error(`total value should be 30. got ${total}`);
  //   }
});

test("Should convert 32 F to 0 C", () => {
  const temp = fahrenheitToCelsius(32);
  expect(temp).toBe(0);
});

test("Should convert  0 C to 32 F ", () => {
  const temp = CelsiusTofahrenheit(0);
  expect(temp).toBe(32);
});
