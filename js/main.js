const main = document.getElementById("main");
const qna = document.getElementById("qna");
const result = document.getElementById("result");

const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const answerContainer = document.getElementById("answer");

// const resultKeys = {
//   mouse: 1,
//   cow: 2,
//   tiger: 3,
//   rabbit: 4,
//   dragon: 5,
//   snake: 6,
//   horse: 7,
//   sheep: 8,
//   monkey: 9,
//   chick: 10,
//   dog: 11,
//   pig: 12,
// };

const resultKeys = {
  ENFJ: 1,
  ENFP: 2,
  INFP: 3,
  INFJ: 4,
  ENTP: 5,
  ENTJ: 6,
  INTJ: 7,
  INTP: 8,
  ESFJ: 9,
  ESTJ: 10,
  ESFP: 11,
  ESTP: 12,
  ISFJ: 13,
  ISTJ: 14,
  ISFP: 15,
  ISTP: 16,
};

const countKeys = ["E", "N", "F", "P", "S", "T", "J", "I"];

const numOfQs = qnaList.length;
const selections = new Array(numOfQs);
let index = 0;

const addAnswer = (opt, i) => {
  const button = document.createElement("button");
  button.innerText = opt.answer;
  button.classList.add("answerOptions");
  button.setAttribute("name", i);

  setTimeout(() => {
    answerContainer.appendChild(button);
    button.style.animation = "fadeIn 0.3s";
  }, 250);
};

const showNextQuestion = (index) => {
  const questionContainer = document.getElementById("question");
  questionContainer.innerHTML = qnaList[index].q;

  let i = 0;
  for (let option of qnaList[index].a) {
    addAnswer(option, i++);
  }

  const statusBar = document.getElementById("statusBar");
  statusBar.style.width = (100 / numOfQs) * (index + 1) + "%";
};

const onLaunchClick = () => {
  main.classList.toggle("hide");
  main.style.animation = "fadeOut 0.3s";
  setTimeout(() => {
    main.classList.toggle("show");
    qna.classList.toggle("hide");
    qna.classList.toggle("show");

    showNextQuestion(0);

    qna.style.animation = "fadeIn 0.25s";
  }, 250);
};

const goToResult = () => {
  setResult();
  qna.classList.toggle("hide");
  qna.style.animation = "fadeOut 0.3s";
  setTimeout(() => {
    qna.classList.toggle("show");
    result.classList.toggle("hide");
    result.classList.toggle("show");
    result.style.animation = "fadeIn 0.3s";
  }, 250);
};

const calcResult = () => {
  const dicObj = {};

  for (let i of countKeys) {
    dicObj[i] = 0;
  }

  for (let i = 0; i < numOfQs; i++) {
    const selected = qnaList[i].a[selections[i]].type;
    for (let type of selected) {
      dicObj[type] += 1;
    }
  }
  console.log(dicObj);

  let answer = "";

  if (dicObj["E"] >= dicObj["I"]) answer += "E";
  else answer += "I";
  if (dicObj["N"] >= dicObj["S"]) answer += "N";
  else answer += "S";
  if (dicObj["F"] >= dicObj["T"]) answer += "F";
  else answer += "T";

  if (dicObj["J"] >= dicObj["P"]) answer += "J";
  else answer += "P";

  return answer;

  // const resultNum = [];
  // const objKeys = Object.keys(dicObj);
  // const objValues = Object.values(dicObj);
  // for (let i = 0; i < 12; i++) {
  //   resultNum.push([objKeys[i], objValues[i]]);
  // }
  // resultNum.sort((a, b) => b[1] - a[1]);
  // console.log(resultNum)
  // return resultNum[0][0];
};

const setResult = () => {
  const result = calcResult();
  const key = resultKeys[result] - 1;

  const resultImg = document.getElementById("resultImage");
  resultImg.src = `img/image-${key}.png`;
  resultImg.alt = result;
  const resultName = document.getElementById("resultName");
  const resultDescription = document.getElementById("resultDescription");
  const resultDwb = document.getElementById("resultDwb");
  resultName.innerText = infoList[key].name;
  resultDescription.innerText = infoList[key].desc;
  resultDwb.innerText = infoList[key].dwb;
};

startBtn.addEventListener("click", onLaunchClick);
// resetBtn.addEventListener("click", onLaunchClick);

answerContainer.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    selections[index] = e.target.name;
    const buttons = document.querySelectorAll(".answerOptions");
    for (let button of buttons) {
      button.style.animation = "fadeOut 0.3s";
      setTimeout(() => {
        button.style.opacity = 0;
        button.remove();
      }, 250);
    }

    if (index + 1 === numOfQs) {
      goToResult();
      return;
    }
    showNextQuestion(++index);
  }
});
