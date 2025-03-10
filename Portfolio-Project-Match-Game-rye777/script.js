function createNewCard() {
  // Step 1: Create a new div element and assign it to a variable called cardElement.
  var cardElement = document.createElement("div");

  // Step 2: Add the "card" class to the variable 'cardElement' from the previous step.
  cardElement.className = "card";

  // Step 3: Write the HTML for the children of the card element (card-down and card-up) as a normal string and assign it as the innerHTML of cardElement.
  cardElement.innerHTML =
    '<div class="card-down"></div><div class="card-up"></div>';

  // Step 4: Return the cardElement.
  return cardElement;
}
createNewCardTest();

function appendNewCard(parentElement) {
  // Step 1: Create a new card by calling createNewCard() and assign it to a variable named cardElement.
  var cardElement = createNewCard();

  // Step 2: Append the card element to the parentElement (making the card element a "child").
  parentElement.appendChild(cardElement);

  // Step 3: Return the card element.
  return cardElement;
}
appendNewCardTest();

function shuffleCardImageClasses() {
  // Step 1: Create a new array with two of each image class name
  let cardClasses = [
    "image-1",
    "image-1",
    "image-2",
    "image-2",
    "image-3",
    "image-3",
    "image-4",
    "image-4",
    "image-5",
    "image-5",
    "image-6",
    "image-6",
  ];

  // Step 2: Shuffle the array using Underscore's shuffle method
  let shuffledClasses = _.shuffle(cardClasses);

  // Step 3: Return the shuffled array
  return shuffledClasses;
}
shuffleCardImageClassesTest();

function createCards(parentElement, shuffledImageClasses) {
  // Step 1: Make an empty array to hold our card objects.
  var cardObjects = [];

  // Step 2: Write a for loop that loops 12 times to create the 12 cards we need.
  for (var i = 0; i < 12; i++) {
    // Step 2(a): Use appendNewCard to create/append a new card and store the result in a variable.
    var cardElement = appendNewCard(parentElement);

    // Step 2(b): Add an image class to the new card element using shuffledImageClasses[i].
    cardElement.classList.add(shuffledImageClasses[i]);

    // Step 2(c): Append a new object to the card object array. The object should contain the following properties:
    // "index" -- Which iteration of the loop this is.
    // "element" -- The DOM element for the card.
    // "imageClass" -- The string of the image class on the card.
    cardObjects.push({
      index: i,
      element: cardElement,
      imageClass: shuffledImageClasses[i],
    });
  }

  // Step 3: Return the array of 12 card objects.
  return cardObjects;
}

createCardsTest();

function doCardsMatch(cardObject1, cardObject2) {
  // Step 1: Determine if two cards match by comparing their 'imageClass' properties.
  return cardObject1.imageClass === cardObject2.imageClass;
}
doCardsMatchTest();

// The 'counters' object is used as a dictionary to store our counter names and their respective values.
let counters = {};

function incrementCounter(counterName, parentElement) {
  // Step 1: If the 'counterName' property is not defined in the 'counters' object, initialize it with a value of 0.
  if (counters[counterName] === undefined) {
    counters[counterName] = 0;
  }

  // Step 2: Increment the counter for 'counterName'.
  counters[counterName] += 1;

  // Step 3: Change the HTML within 'parentElement' to display the new counter value.
  parentElement.innerText = counters[counterName];
}

incrementCounterTest();

let lastCardFlipped = null; // Variable to keep track of the first flipped card

function onCardFlipped(newlyFlippedCard) {
  // Step 1: Use the 'incrementCounter' function to add one to the flip counter UI.
  const flipCounterElement = document.getElementById("flip-count");
  incrementCounter("flips", flipCounterElement);

  // Step 2: If 'lastCardFlipped' is null (this is the first card flipped), update 'lastCardFlipped' and return (nothing else to do)
  if (!lastCardFlipped) {
    lastCardFlipped = newlyFlippedCard;
    return;
  }

  // Step 3: Check if the two cards match
  if (!doCardsMatch(lastCardFlipped, newlyFlippedCard)) {
    // The cards don't match: remove the "flipped" class from each and reset 'lastCardFlipped' to null
    lastCardFlipped.element.classList.remove("flipped");
    newlyFlippedCard.element.classList.remove("flipped");
    lastCardFlipped = null;
    return;
  }

  // Step 4: Now we have two matching cards. Increment the match counter and optionally add a "glow" effect to the matching cards.
  const matchCounterElement = document.getElementById("match-count");
  incrementCounter("matches", matchCounterElement);
  lastCardFlipped.element.classList.add("glow");
  newlyFlippedCard.element.classList.add("glow");

  // Step 5: Play either the win audio or match audio based on whether the user has the number of matches needed to win.
  if (counters.matches === 6) {
    // Assuming there are 6 pairs to match for a win
    winAudio.play();
  } else {
    matchAudio.play();
  }

  // Step 6: Reset 'lastCardFlipped' to null
  lastCardFlipped = null;
}

function resetGame() {
  // Step 1: Get the card container by its id and store it in a variable.
  var cardContainer = document.getElementById("card-container");

  // Step 2: Clear all the cards by using a while loop to remove the first child of the card container as long as a first child exists.
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }

  // Step 3: Get the HTML elements that display the flip and match counts and reset their inner text to 0.
  document.getElementById("flip-count").innerText = "0";
  document.getElementById("match-count").innerText = "0";

  // Step 4: Reassign the value of the `counters` dictionary to an empty object
  counters = {};

  // Step 5: Set lastCardFlipped back to null.
  lastCardFlipped = null;

  // Step 6: Set up a new game.
  setUpGame(); // Assuming setUpGame is a function provided elsewhere that initializes the game setup
}

// ⛔️ Set up the game. Do not edit below this line! ⛔
setUpGame();
