"use strict";

// INITIALIZATION THE PROJECT
const addButton = document.querySelector(".btn-add");
const rollButton = document.querySelector(".btn-roll");
let removeButtons = document.querySelectorAll(".btn-remove");
const inputItem = document.querySelector(".add-item-field");
const itemsContainer = document.querySelector(".items-container");
const matchesContainer = document.querySelector(".matches-container");
const itemsNumber = document.querySelector(".items-number");

const testOptions = document.querySelector(".select-test");

let bowl = [];
let matches = {};

// -------------------------
// GUI Interactions
// -------------------------

const displayItems = function (item) {
  // CREATE Item Elements
  const itemDiv = document.createElement("div");
  const itemName = document.createElement("p");
  const btnRemove = document.createElement("button");
  const removeIcon = document.createElement("ion-icon");

  // Assign Item Classes

  itemDiv.classList.add(
    "item-container",
    `item-container--${bowl.indexOf(item)}`
  );

  itemName.classList.add("item-name", `item-name--${bowl.indexOf(item)}`);

  btnRemove.classList.add("btn-remove", `btn-remove--${bowl.indexOf(item)}`);

  removeIcon.classList.add("remove-icon", "icon");

  // Assign content to Elements:
  itemName.textContent = item;
  removeIcon.name = "close";

  // Show Items
  itemsContainer.appendChild(itemDiv);
  itemDiv.appendChild(itemName);
  itemDiv.appendChild(btnRemove);
  btnRemove.appendChild(removeIcon);

  // Update Remove Buttons Array
  removeButtons = document.querySelectorAll(".btn-remove");

  // Activate Remove Button
  removeButtons[bowl.indexOf(item)].addEventListener("click", function () {
    itemDiv.remove();
    bowl.splice(bowl.indexOf(item), 1);
    itemsNumber.textContent = bowl.length;
  });

  rollButton.addEventListener("click", function () {
    itemDiv.remove();
  });
};

const showMatches = function () {
  for (let i = 0; i < Object.keys(matches).length; i++) {
    const matchesArry = Object.values(matches);

    const matchItem1 = matchesArry[i][0];
    const matchItem2 = matchesArry[i][1];

    // Create Elements
    const itemDiv = document.createElement("div");
    const firstItemName = document.createElement("span");
    const vsWord = document.createElement("span");
    const secondItemName = document.createElement("span");

    // Assign Classes
    itemDiv.classList.add("match-container", `match--${i}`);
    firstItemName.classList.add("match-item", `match--${i}`);
    secondItemName.classList.add("match-item", `match--${i}`);

    // Assign Texts
    firstItemName.textContent = matchItem1;
    vsWord.textContent = "VS";
    secondItemName.textContent = matchItem2;

    // Show the Elements
    matchesContainer.appendChild(itemDiv);
    itemDiv.appendChild(firstItemName);
    itemDiv.appendChild(vsWord);
    itemDiv.appendChild(secondItemName);

    rollButton.addEventListener("click", function () {
      itemDiv.remove();
    });
  }
};

const addItem = function () {
  const item = inputItem.value;
  if (item) {
    bowl.push(item);
    inputItem.value = "";
    displayItems(item);
  }
  itemsNumber.textContent = bowl.length;
};

addButton.addEventListener("click", addItem);
inputItem.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addItem();
  }
});

// -------------------------
// the SPIN script
// -------------------------

// Spin Function | to get a random player from the bowl
const getPlayer = function () {
  let dice = Math.trunc(Math.random() * bowl.length);
  const player = bowl[dice];
  return player;
};

// Removal Function | to remove the player from the Bowl
const removePlayer = function (player) {
  bowl.splice(bowl.indexOf(`${player}`), 1);
};

// ADD the Chosen players to their match
const addToMatch = function (I, player1, player2) {
  matches[`match${I}`] = [`${player1}`, `${player2}`];
};

// While LOOP Function to return the process until all the players are divided in matches
function spin() {
  matches = {};
  let i = 1;
  while (bowl.length >= 2) {
    const chosenPlayer1 = getPlayer();
    removePlayer(chosenPlayer1);
    const chosenPlayer2 = getPlayer();
    removePlayer(chosenPlayer2);
    addToMatch(i, chosenPlayer1, chosenPlayer2);

    i++;
  }
  if (bowl.length === 1) {
    const chosenPlayer1 = getPlayer();
    removePlayer(chosenPlayer1);
    const chosenPlayer2 = "—";
    bowl.splice(bowl.indexOf("—"), 1);
    addToMatch(i, chosenPlayer1, chosenPlayer2);
  }
  itemsNumber.textContent = bowl.length;
  showMatches();
}

rollButton.addEventListener("click", spin);
