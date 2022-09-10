import { name } from "./app";

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

const userName: string | null = localStorage.getItem('userName');

let correct  = 0
let wrong   = 0
let totalQ = 20
let totalScore = 0
let answeredQuestion = 0
const attemptedQuestions:Array<Number> = []

let QId:Number;
let curQuestion:string = ''
let curCorrectAns:string = ''
let optionA:string = ''
let optionB:string = ''
let optionC:string = ''
let optionD:string = ''


const init = ():void =>{
    correctAns.innerText = correct.toString();
    wrongAns.innerText = wrong.toString();
    totalAns.innerText = totalQ.toString();
    score.innerHTML = `Score : ${totalScore.toString()}`

}


const runQuiz = ():void =>{
    
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
    console.log(index, attemptedQuestions)

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
        console.log(answer)
        showQuestion()
    } catch (error) {
        console.log(error)
    }
}


const getPlayerDetails = ():void =>{
    answeredQ.innerText = answeredQuestion.toString()
    totalQuiz.innerText = totalQ.toString()
    quizScore.innerText = totalScore.toString()
}

const correctChoice = ():void =>{
    getQuestion()
    correct += 1
    totalScore += 2
    answeredQuestion++
    console.log(answeredQuestion)

    answeredQ.innerText = answeredQuestion.toString()
    quizScore.innerText = totalScore.toString()
}

const wrongChoice = ():void =>{
    getQuestion()
    wrong += 1
    answeredQuestion++
    

    answeredQ.innerText = answeredQuestion.toString()
}

const getId = ():Number =>{
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


    anserBoxA.addEventListener('click', ()=>{
        if(anserBoxA.textContent == curCorrectAns){
            correctChoice()
        } else{
            wrongChoice()
        }
    })
    
    anserBoxB.addEventListener('click', ()=>{
        if(anserBoxB.textContent == curCorrectAns){
            correctChoice()
        } else{
            wrongChoice()
        }
    })
    
    anserBoxC.addEventListener('click', ()=>{
        if(anserBoxC.textContent == curCorrectAns){
            correctChoice()
        } else{
            wrongChoice()
        }
    })
    
    anserBoxD.addEventListener('click', ()=>{
        if(anserBoxD.textContent == curCorrectAns){
            correctChoice()
        } else{
            wrongChoice()
        }
    })
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