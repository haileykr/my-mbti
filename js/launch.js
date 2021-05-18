const main = document.getElementById('main');
const qna = document.getElementById('qna');

const startBtn = document.getElementById('startBtn');

const questionContainer = document.getElementById('question')

const answerContainer = document.getElementById('answer');


const addAnswer = (option) => {
    const button = document.createElement('button');
    button.innerText = option;
    answerContainer.appendChild(button);
}

const showNextQuestion=(index)=>{
    questionContainer.innerHTML = qnaList[index].q;
    

    
    
    for (let i in qnaList[index]){
        addAnswer(i);
    }
}

const onLaunchClick = () => {
    main.classList.toggle('hide')
    main.style.animation = "fadeOut 1s";
    setTimeout(() => {
        main.classList.toggle('show')
        qna.classList.toggle('hide')
        qna.classList.toggle('show')

        showNextQuestion(0);
    
        qna.style.animation = "fadeIn 1s";
    },1000);

}

startBtn.addEventListener('click',onLaunchClick);