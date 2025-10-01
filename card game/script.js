const symbols = ["1", "2", "3", "4", "5", "6", "7", "8"];
const cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
const gameBoard = document.getElementById("game-board");

let flippedCards = [];
let matchedCards = 0;

cards.forEach((symbol) => {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.symbol = symbol;
  card.addEventListener("click", () => flipCard(card));
  gameBoard.appendChild(card);
});

function flipCard(card) {
  if (card.classList.contains("flipped") || flippedCards.length === 2) return;

  card.classList.add("flipped");
  card.textContent = card.dataset.symbol;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    const [first, second] = flippedCards;
    if (first.dataset.symbol === second.dataset.symbol) {
      first.classList.add("matched");
      second.classList.add("matched");
      flippedCards = [];
      matchedCards += 2;
      if (matchedCards === cards.length)
        setTimeout(() => alert("You won!"), 100);
    } else {
      setTimeout(() => {
        flippedCards.forEach((c) => {
          c.classList.remove("flipped");
          c.textContent = "";
        });
        flippedCards = [];
      }, 500);
    }
  }
}