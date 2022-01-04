const body = document.querySelector("body");
const buttonEasy = document.querySelector(".level__btn--easy");
const buttonMedium = document.querySelector(".level__btn--medium");
const buttonHard = document.querySelector(".level__btn--hard");
const level = document.querySelector(".level");
const gameDisplayLowHighAnswer = document.querySelector(".game__header");
const game = document.querySelector(".game");
const chancesRemaining = document.querySelector(".game__chances");
const checkNumberBtn = document.querySelector(".game__checkanswer");
const gameNumberInput = document.querySelector(".game__number");
const showWinOrLostScreen = document.querySelector(".result");
const showWinOrLostH1 = document.querySelector(".result__h1");

let lives = 7;
let randomGameNumber;

const randomNumberGenerator = () => {
  const number = Math.trunc(Math.random() * 100);
  return (randomGameNumber = number);
};

const startGame = () => {
  level.classList.add("hidden");
  game.classList.remove("hidden");
  gameDisplayLowHighAnswer.textContent = "Choose a number between 1 and 100";
  clearInput();
  chancesRemaining.textContent = `You have: ${lives} chances remaining`;
  randomNumberGenerator();
  console.log(randomGameNumber);
};

const clearInput = () => {
  gameNumberInput.value = "";
  gameNumberInput.focus();
  gameNumberInput.select();
};

const gameOver = () => {
  showWinOrLostScreen.classList.remove("hidden");
  game.classList.add("hidden");
  lives = 7;
  setTimeout(() => {
    showWinOrLostScreen.classList.add("hidden");
    level.classList.remove("hidden");
    body.style.backgroundColor = "white";
  }, 1500);
};

const rightAnswer = () => {
  showWinOrLostH1.textContent = "You Won!!";
  body.style.backgroundColor = "green";
  gameOver();
};

const gameIsLost = () => {
  showWinOrLostH1.textContent = "You Lost";
  body.style.backgroundColor = "red";
  gameOver();
};

const decreaseLives = () => {
  --lives;
  chancesRemaining.textContent = `You have: ${lives} chances remaining`;
  if (lives < 1) {
    gameIsLost();
  }
};

const wrongAnswer = () => {
  decreaseLives();
  if (+gameNumberInput.value > randomGameNumber) {
    gameDisplayLowHighAnswer.textContent = "Too High";
  } else {
    gameDisplayLowHighAnswer.textContent = "Too Low";
  }
  clearInput();
};

const checkAnswer = () => {
  if (+gameNumberInput.value === randomGameNumber) rightAnswer();
  else wrongAnswer();
};

buttonEasy.addEventListener("click", () => {
  lives = 7;
  startGame();
});
buttonMedium.addEventListener("click", () => {
  lives = 5;
  startGame();
});
buttonHard.addEventListener("click", () => {
  lives = 4;
  startGame();
});

checkNumberBtn.addEventListener("click", checkAnswer);

gameNumberInput.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    checkAnswer();
  }
});
