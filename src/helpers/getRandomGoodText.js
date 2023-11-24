import good_texts from '../data/good_texts';


function getRandomGoodTextInner(texts) {
  const randomIndex = Math.floor(Math.random() * texts.length);
  return texts[randomIndex];
}

function getRandomGoodText() {
  return getRandomGoodTextInner(good_texts);
}

export default getRandomGoodText;