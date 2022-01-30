const buttonQuay = document.querySelector(".hand");
const circle = document.querySelector(".circle");
const noti = document.querySelector(".notification");
const buttonOk = document.querySelector(".btn-ok");
const moneyContainer = document.querySelector(".money-noti");

const DEFAUT_VALUE = [
  {
    min: 0,
    max: 50,
    value: 10000,
    deg: 3,
  },
  {
    min: 51,
    max: 70,
    value: 20000,
    deg: 4,
  },
  {
    min: 71,
    max: 85,
    value: 50000,
    deg: 5,
  },
  {
    min: 86,
    max: 93,
    value: 100000,
    deg: 0,
  },
  {
    min: 94,
    max: 98,
    value: 200000,
    deg: 1,
  },
  {
    min: 99,
    max: 100,
    value: 500000,
    deg: 2,
  },
];
let money = 0;
let arc = 0;
let degCircle = 0;
const round = 10;
const timePerRound = 2;
let timer;
let notier;
circle.style.transform = "rotate(0deg)";
const getRandomValue = () => {
  const random = Math.floor(Math.random() * 100);
  const data = DEFAUT_VALUE.find(
    (item) => item.min <= random && item.max >= random
  );
  money = data.value;
  const min = data.deg * 60 + 30;
  const max = data.deg * 60 + 90;
  degCircle = Math.floor(Math.random() * (max - min)) + min;
  arc = degCircle + 360 * round;
  console.log(money, arc);
};
const getTransitonTime = () =>
  round * timePerRound + (timePerRound * degCircle) / 360;

const clear = () => {
  circle.style.transition = "";
  buttonQuay.style.animation = "";
  circle.style.transform = "rotate(0deg)";
};

const rotate = () => {
  clearTimeout(notier);
  clearTimeout(timer);
  circle.style.transition = "all " + getTransitonTime() + "s ease-out";
  circle.style.transform = `rotate(${arc}deg)`;
};

buttonQuay.addEventListener("click", () => {
  getRandomValue();
  clear();
  timer = setTimeout(() => {
    rotate();
    buttonQuay.style.animation = `indexButton ${getTransitonTime()}s ease-in forwards`;
  }, 10);
  setTimeout(() => {
    moneyContainer.textContent = `${money}`;
    noti.style.display = "block";
  }, 22000);
});
buttonOk.addEventListener("click", () => {
  noti.style.display = "none";
});
