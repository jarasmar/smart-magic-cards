const suit = ['hearts', 'clubs', 'diamonds', 'spades'];
const cardsWrapper = document.querySelector('.cards-wrapper');
const btnWrapper = document.querySelector('.btn-wrapper'); /* eslint-disable-line */
const selectedCardsWrapper = document.querySelector('.selected-cards'); /* eslint-disable-line */
const cards = [];
let cardValue = "";
let cardSuit = "";
// let magicResult = [];

function createCards() {
  // Create an array with objects containing the value and the suit of each card
  for (let i = 1; i <= 13; i += 1) {
    const cardObject = {
      value: i,
      suit: suit[0],
    };
    cards.push(cardObject);
  }

  for (let i = 1; i <= 13; i += 1) {
    const cardObject = {
      value: i,
      suit: suit[1],
    };
    cards.push(cardObject);
  }

  for (let i = 1; i <= 13; i += 1) {
    const cardObject = {
      value: i,
      suit: suit[2],
    };
    cards.push(cardObject);
  }

  for (let i = 1; i <= 13; i += 1) {
    const cardObject = {
      value: i,
      suit: suit[3],
    };
    cards.push(cardObject);
  }
}

 // For each dataObject, create a new card and append it to the DOM
function displayCards() { 
  cards.forEach((card, i) => {
    const positionFromLeft = i * 20;
    const cardElement = document.createElement('a');
    cardElement.setAttribute('data-value', card.value);
    cardElement.setAttribute('data-suit', card.suit);
    cardElement.setAttribute('onclick', 'selectCard(this);');
    cardElement.classList.add('card', `${card.suit}-${card.value}`);
    cardElement.style.left = `${positionFromLeft}px`;
    cardsWrapper.append(cardElement);
  });
}

// Function to clear out the initial button and create new buttons to play the game.
function createButtons() {
  document.getElementById('start-game').classList.add('invisible');
  document.getElementById('shuffle').classList.remove('invisible');
  document.getElementById('show-hide').classList.remove('invisible');
}

// Function to start the game by clearing the wrapper, creating
// and appending the buttons and all the cards to the DOM
function startGame() {
  createButtons();
  createCards();
  displayCards();
}

function shuffle() {
  for (var i = cards.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
  }

  displayCards();  
}

function flipCards() {
  if (cardsWrapper.classList.contains('hidden')) {
    cardsWrapper.classList.remove('hidden');
  } else {
    cardsWrapper.classList.add('hidden');
  } 
}

function selectCard(card) {
  // Change the position of the card to 0 so it is centered in selectedCards div
  card.style.left = 0;
  selectedCardsWrapper.append(card);

  cardValue = card.getAttribute('data-value');
  cardSuit = card.getAttribute('data-suit');

  document.getElementById('magic').classList.remove('invisible');
}

function performMagic() {
  // Get result cards after magic trick
  let magicResult = [...cardsWrapper.children].filter(card => {
    return (card.getAttribute('data-value') === cardValue && card.getAttribute('data-suit') !== cardSuit);
  });

  // Display magic trick result cards
  [...magicResult].forEach((card, i) => {
    const position = (i + 1) * 20;
    card.style.left = `${position}px`;
    selectedCardsWrapper.append(card);
  });
}

document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('shuffle').addEventListener('click', shuffle);
document.getElementById('show-hide').addEventListener('click', flipCards);
document.getElementById('magic').addEventListener('click', performMagic);
cardsWrapper.addEventListener('click', selectCard(this));