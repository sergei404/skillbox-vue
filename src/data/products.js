const getRandomNumber = ((min, max) => {
  return min + Math.floor(Math.random() * (max + 1 - min));
});

export default [
  {
    id: ('' + Math.random()).slice(2),
    categoryId: 4,
    title: 'Смузи',
    price: getRandomNumber(3000, 40000),
    image: 'https://cdn.pixabay.com/photo/2020/07/18/11/20/chia-5416921__340.jpg'
  },
  {
    id: ('' + Math.random()).slice(2),
    categoryId: 1,
    title: 'Кастрюля',
    price: getRandomNumber(3000, 40000),
    image: 'https://www.rozov.ru/templates/images/texts/3_36091134208027.jpg'
  },
  {
    id: ('' + Math.random()).slice(2),
    categoryId: 4,
    title: 'Лягушка',
    price: getRandomNumber(3000, 40000),
    image: 'https://cdn.pixabay.com/photo/2020/07/22/09/11/frog-5428516__340.jpg'
  },
  {
    id: ('' + Math.random()).slice(2),
    categoryId: 3,
    title: 'Кресло',
    price: getRandomNumber(3000, 40000),
    image: 'https://enginform.com/application/files/illustrations/articles/400x132/2ba86d00eb12413c0580c11be3ce4c5e.jpg'
  },
  {
    id: ('' + Math.random()).slice(2),
    categoryId: 2,
    title: 'Сливы',
    price: getRandomNumber(3000, 40000),
    image: 'https://cdn.pixabay.com/photo/2020/07/21/16/03/fruit-5426690__340.jpg'
  },
  {
    id: ('' + Math.random()).slice(2),
    categoryId: 5,
    title: 'Набор инструментов',
    price: getRandomNumber(3000, 40000),
    image: 'https://images.obi.ru/product/RU/1500x1500/410924_1.jpg'
  },
  {
    id: ('' + Math.random()).slice(2),
    categoryId: 3,
    title: 'Канцелярский набор',
    price: getRandomNumber(3000, 40000),
    image: 'https://www.officemag.ru/goods/231588/88a15c90f20e93d1335edd6761fbeab1_xl.jpg'
  },
  {
    id: ('' + Math.random()).slice(2),
    categoryId: 5,
    title: 'Компрессор',
    price: getRandomNumber(3000, 40000),
    image: 'https://fubag.ru/upload/iblock/84b/HOUSEMASTERKIT_8213800KOA610_5.jpg'
  },
  {
    id: ('' + Math.random()).slice(2),
    categoryId: 1,
    title: 'Часы',
    price: getRandomNumber(3000, 40000),
    image: 'https://fototips.ru/wp-content/uploads/2009/05/1.jpg'
  },
  {
    id: ('' + Math.random()).slice(2),
    categoryId: 4,
    title: 'Мороженое',
    price: getRandomNumber(3000, 40000),
    image: 'https://cdn.pixabay.com/photo/2020/07/24/05/48/ice-cream-5432990_960_720.png'
  },
  {
    id: ('' + Math.random()).slice(2),
    categoryId: 2,
    title: 'Бокал',
    price: getRandomNumber(3000, 40000),
    image: 'https://fe-foto.ru/images/stories/steklyannie-predmety.jpg'
  },
  {
    id: ('' + Math.random()).slice(2),
    title: 'Мотоцикл',
    price: getRandomNumber(3000, 40000),
    image: 'https://cdn.pixabay.com/photo/2020/07/14/09/10/motorcycle-5403549__340.jpg'
  },
]