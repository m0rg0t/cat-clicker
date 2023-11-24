import cats_list from '../data/cats_list';


function getRandomCat(cat_list) {
  const randomIndex = Math.floor(Math.random() * cat_list.length);
  return cat_list[randomIndex];
}

function getRandomCatImage() {
  return getRandomCat(cats_list);
}

export default getRandomCatImage;