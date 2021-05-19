const main = document.getElementById("main");
const qna = document.getElementById("qna");

const result = document.getElementById("result");

const startBtn = document.getElementById("startBtn");

const questionContainer = document.getElementById("question");

const answerContainer = document.getElementById("answer");

const statusBar = document.getElementById("statusBar");

const resultName = document.getElementById("resultName");

const resultDescription = document.getElementById("resultDescription");

const resultKeys = {'mouse': 1, 'cow': 2, 'tiger': 3, 'rabbit': 4,'dragon': 5, 'snake':6, 'horse':7, 'sheep':8, 'monkey':9,'chick':10,'dog':11, 'pig':12}
const numOfQs = 12;

const selections = new Array(numOfQs);

let index = 0;

const addAnswer = (opt, i) => {
  const button = document.createElement("button");
  button.innerText = opt.answer;
  button.classList.add("answerOptions");
  button.setAttribute("name", i);

  setTimeout(() => {
    answerContainer.appendChild(button);
    button.style.animation = "fadeIn 0.5s";
  }, 500);
};

const showNextQuestion = (index) => {
  questionContainer.innerHTML = qnaList[index].q;

  let i = 0;
  for (let option of qnaList[index].a) {
    addAnswer(option, i++);
  }

  statusBar.style.width = (100 / numOfQs) * (index + 1) + "%";
};

const onLaunchClick = () => {
  main.classList.toggle("hide");
  main.style.animation = "fadeOut 0.5s";
  setTimeout(() => {
    main.classList.toggle("show");
    qna.classList.toggle("hide");
    qna.classList.toggle("show");

    showNextQuestion(0);

    qna.style.animation = "fadeIn 0.5s";
  }, 500);
};

const goToResult = () => {
    calcResult();   
  qna.classList.toggle("hide");
  qna.style.animation = "fadeOut 0.5s";
  setTimeout(() => {
    qna.classList.toggle("show");

    result.classList.toggle("hide");
    result.classList.toggle("show");
    result.style.animation = "fadeIn 0.5s";
  }, 500);
};

const calcResult = () => {
    const dicObj = {};
    dicObj['mouse'] = 0;
    dicObj['cow'] = 0;
    dicObj['tiger'] = 0;
    dicObj['rabbit'] = 0;
    dicObj['dragon'] = 0;
    dicObj['snake'] = 0;
    dicObj['horse'] = 0;
    dicObj['sheep'] = 0;
    dicObj['monkey'] = 0;
    dicObj['chick'] = 0;
    dicObj['dog'] = 0;
    dicObj['pig'] = 0;
    

    for (let i=0; i < numOfQs; i++ ) {
        const selected = qnaList[i].a[selections[i]].type;
        for (let type of selected){
            dicObj[type] += 1;
        }
    }
    console.log(dicObj)

    const resultNum = []
    const objKeys = Object.keys(dicObj)
    const objValues = Object.values(dicObj)
    for (let i=0; i < 12; i++){
        resultNum.push([objKeys[i], objValues[i]])
    }
    resultNum.sort((a, b) => b[1] - a[1]);
    console.log(resultNum[0][0]);
    console.log(infoList[resultKeys[resultNum[0][0]]].name);
    console.log(infoList[resultKeys[resultNum[0][0]]].desc);
}

startBtn.addEventListener("click", onLaunchClick);

answerContainer.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    selections[index]=e.target.name
    const buttons = document.querySelectorAll(".answerOptions");
    for (let button of buttons) {
      button.style.animation = "fadeOut 0.5s";

      setTimeout(() => {
        button.remove();
      }, 500);
    }

    if (index + 1 === numOfQs) {
      goToResult();
      return;
    }

    showNextQuestion(++index);
  }
});
