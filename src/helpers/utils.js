export const getRandomNumber = ((min, max) => {
  return min + Math.floor(Math.random() * (max + 1 - min));
});

export const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let rand = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[rand]] = [arr[rand], arr[i]];
  }
  return arr;
};

export function numberFormat(num) {
  return new Intl.NumberFormat('ru-RU').format(num)
}