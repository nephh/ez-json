function randString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

function randNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function generateJSON(template) {
  const regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

  return Object.fromEntries(
    template.map(([key, value]) => {
      switch (typeof value) {
        case "number":
          return [key, randNumber(1, 100)];
        case "string":
          if (regex.test(value)) {
            return [
              key,
              `${randString(randNumber(4, 8))}@${randString(
                randNumber(2, 5)
              )}.com`,
            ];
          } else {
            return [key, randString(randNumber(4, 12))];
          }
        default:
          return [key, value];
      }
    })
  );
}
