import { name, greetMe } from "./app";

const User = document.querySelector<HTMLHeadingElement>('.user-name')!;
const greeting = document.querySelector<HTMLHeadingElement>('.greet')!;
const score = document.querySelector<HTMLHeadingElement>('.score')!;
const correctAns = document.querySelector<HTMLSpanElement>('.correct')!;
const wrongAns = document.querySelector<HTMLSpanElement>('.wrong')!;
const totalAns = document.querySelector<HTMLSpanElement>('.total')!;
const questionBox = document.querySelector<HTMLHeadingElement>('.question-box')!;
const anserBoxA = document.querySelector<HTMLDivElement>('.option-a')!;
const anserBoxB = document.querySelector<HTMLDivElement>('.option-b')!;
const anserBoxC = document.querySelector<HTMLDivElement>('.option-c')!;
const anserBoxD = document.querySelector<HTMLDivElement>('.option-d')!;
const optionBoxes = document.querySelectorAll<HTMLDivElement>('.q-options')!;
const answeredQ = document.querySelector<HTMLSpanElement>('.answered-q')!;
const totalQuiz = document.querySelector<HTMLSpanElement>('.total-q')!;
const quizScore = document.querySelector<HTMLSpanElement>('.score')!;
const QwrongCount = document.querySelector<HTMLSpanElement>('#wrong')!;
const QrightCount = document.querySelector<HTMLSpanElement>('#right')!;

const userName: string | null = localStorage.getItem('userName');


let correct  = 0
let wrong   = 0
let totalQ = 20
let totalScore: number = 0;
let generalTotalScore: number = Number(localStorage.getItem('totalScore'))

console.log(totalScore)
let answeredQuestion = 0
const attemptedQuestions:Array<number> = []

let QId:number;
let curQuestion:string = ''
let curCorrectAns:string = ''
let optionA:string = ''
let optionB:string = ''
let optionC:string = ''
let optionD:string = ''

let scoreTimeout:any;

// let levelOne:Array<number> = [0, 1, 2,3, 4, 5, 6,7,8,9,10,
//                                 11,12,13,14,15,16,17,18,19,20,
//                                     21,22,23,24,25]

                                

// const getRandomIndex = (arr: Array<number>):number =>{
//     let index:number = arr[Math.floor(Math.random() * arr.length)];
//     let newArr = arr.splice(index, 1)

//     return index
// }


const init = ():void =>{
    correctAns.innerText = correct.toString();
    wrongAns.innerText = wrong.toString();
    totalAns.innerText = totalQ.toString();
    score.innerHTML = `Total Score : ${generalTotalScore?.toString()}`

}


const showQuestion = ():void =>{
    questionBox.innerText = curQuestion
    anserBoxA.innerText = optionA
    anserBoxB.innerText = optionB
    anserBoxC.innerText = optionC
    anserBoxD.innerText = optionD
    
}

const getQuestion = async () => {
    const response = await fetch("./question.json");

    let index:any = getId()
    // console.log(index, attemptedQuestions)

    try {
        const data = await response.json()
        const quizQuestion = data[index];

        const {question, options, answer} = quizQuestion

        curQuestion = question
        optionA = options.a
        optionB = options.b
        optionC = options.c
        optionD = options.d
        curCorrectAns = answer

        // console.log(answer)

        showQuestion()
    } catch (error) {
        console.log(error)
    }
}




const getPlayerDetails = ():void =>{
    answeredQ.innerText = answeredQuestion.toString()
    totalQuiz.innerText = totalQ.toString()
    quizScore.innerText = totalScore.toString()
    QwrongCount.innerText = `Wrong : ${wrong.toString()}`
    QrightCount.innerText = `Correct : ${correct.toString()}`
}

const runQuiz = ():void =>{
    
    const controller = new AbortController()

    optionBoxes.forEach((elem) =>{
        elem.addEventListener('click', (e:Event)=>{
            if(elem.textContent == curCorrectAns){
                controller.abort()
                // console.log('clicked')
                elem.style.backgroundColor = 'green'
                elem.style.color = 'white'
                elem.innerText = 'CORRECT ANSWER'
                elem.style.transition = '.6s ease-in'

                scoreTimeout = setTimeout(() => {
                    

                    elem.style.backgroundColor = 'aliceblue'
                    elem.style.color = 'black'

                    

                    correctChoice()
                }, 2000);

            } else{
                controller.abort()

                elem.style.backgroundColor = 'red'
                elem.style.color = 'white'
                elem.style.transition = '.4s ease-in-out'
                elem.textContent = 'WRONG ANSWER'
                

                scoreTimeout = setTimeout(() => {
                    wrongChoice()

                    elem.style.backgroundColor = 'aliceblue'
                    elem.style.color = 'black'
                }, 2000);
            }
        }, {signal: controller.signal})
    })
}

const correctChoice = ():void =>{
    getQuestion()
    runQuiz()
    correct += 1
    totalScore += 2
    answeredQuestion++
    console.log(answeredQuestion)

    answeredQ.innerText = answeredQuestion.toString()
    quizScore.innerText = totalScore.toString()
    QrightCount.innerText = `Correct : ${correct.toString()}`

    localStorage.setItem('totalScore', totalScore.toString())
    clearTimeout(scoreTimeout)
}

const wrongChoice = ():void =>{
    getQuestion()
    runQuiz()
    wrong += 1
    answeredQuestion++
    

    answeredQ.innerText = answeredQuestion.toString()
    QwrongCount.innerText = `Wrong : ${wrong.toString()}`

    clearTimeout(scoreTimeout)
}

const getId = ():number =>{
    QId = Math.floor(Math.random() * 2)
    // while(attemptedQuestions.includes(QId) && attemptedQuestions.length < 2){
    //     QId = Math.floor(Math.random() * 2)
    // }
    attemptedQuestions.push(QId)
    return QId
}

const greet = ():void =>{
    
    const hour = new Date().getHours();
    if(hour < 12) greeting.innerText = 'Good Morning!';
    else if (hour < 18) greeting.innerText = 'Good Afternoon!';
    else greeting.innerText = 'Good Evening!';
}



if(window.location.pathname == '/public/quiz.html'){
    getQuestion()
    getPlayerDetails()
    runQuiz()

}

if(window.location.pathname == '/public/index.html'){
    init()
    greet()
}

window.onload = ():void => {
    // localStorage.clear();

    if(!userName){
        console.log('empty')
        window.location.replace('./onboarding.html')
    } else{
        User.innerText = `Hello ${userName}`
    }


    
}


//the interview part should contain a button that automatically launches qoogle and populates the search item in it...