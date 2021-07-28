const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        return reject("Numbers must be non-negative");
      }
      resolve(a + b);
    }, 2000);
  });
};

const doWork = async () => {
  const sum = await add(110, 40);
  const sum1 = await add(sum, 20);
  return sum1;
};

doWork()
  .then((result) => {
    console.log(result);
  })
  .catch((e) => console.log(e));
