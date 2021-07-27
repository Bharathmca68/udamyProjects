const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
};

add(1, 3)
  .then((sum) => {
    console.log(sum);
    add(1, 1)
      .then((sum) => {
        console.log(sum);
      })
      .catch((errr) => console.log(err));
  })

  .catch((errr) => console.log(err));
