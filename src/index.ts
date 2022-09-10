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


const userName: string | null = localStorage.getItem('userName');

const correct:Number  = 0
const wrong:Number   = 0
const totalQ:Number = 20
const totalScore:Number = 0

let curQuestion:string = ''
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

const showQuestion = ():void =>{
    questionBox.innerText = curQuestion
    anserBoxA.innerText = optionA
    anserBoxB.innerText = optionB
    anserBoxC.innerText = optionC
    anserBoxD.innerText = optionD
}

const getQuestion = async () => {
    const response = await fetch("./question.json");
    

    try {
        const data = await response.json()
        const quizQuestion = data[0]
        const {question, options, answer} = quizQuestion
        curQuestion = question
        optionA = options.a
        optionB = options.b
        optionC = options.c
        optionD = options.d


        console.log(question)
        showQuestion()
    } catch (error) {
        console.log(error)
    }

    
}

const greet = ():void =>{
    
    const hour = new Date().getHours();
    if(hour < 12) greeting.innerText = 'Good Morning!';
    else if (hour < 18) greeting.innerText = 'Good Afternoon!';
    else greeting.innerText = 'Good Evening!';
}

if(window.location.pathname == '/public/quiz.html'){
    getQuestion()
}



window.onload = ():void => {
    // localStorage.clear();

    if(!userName){
        console.log('empty')
        window.location.replace('./onboarding.html')
    } else{
        User.innerText = `Hello ${userName}`
    }

    init()
    greet()
    
}


//the interview part should contain a button that automatically launches qoogle and populates the search item in it...