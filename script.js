let currentQuestion = 0; //startwert
let rightAnswers = 0;
let AUDIO_SUCCESS = new Audio('audio/success.mp3'); // od nur String mit Pfad hier speichern und eig Fkt. playAudio('path');
let AUDIO_WRONG = new Audio('audio/wrong1.mp3');

function init(){

    displayQuestionCount();
    showQuestion();

}

function displayQuestionCount() {
    let questionCount = document.getElementsByClassName('amount-questions'); // returns html collection (array)
    for (i = 0; i < questionCount.length; i++) {
        // show amount of all questions
        questionCount[i].innerHTML = questions.length;
    }
}

function showQuestion() {
    if ( gameOver() ) { //
       showEndScreen();
    } else {
        getNextQuestion();
    }
}

function gameOver() {
    return currentQuestion >= questions.length;
}

function correctAnswer(question, clickedAnswer) {
    let clickedAnswerNumber = clickedAnswer.slice(-1); // cut out last character (index -1) of a string
    return question["right_answer"] == clickedAnswerNumber;
}

function showEndScreen() {
     document.getElementById('end-screen').style = ''; // auf html-attribut(!) "style" zugreifen (nicht direckt css style attribut in style.css datei?)
     document.getElementById('question-body').style = 'display: none';
     //document.getElementById('card-image').src = 'img/spacecat.jpg'; // attribut src ändern
     document.getElementById('card-image').style = 'display: block'
    //  hide progress - bar
    document.getElementById('progress').style.display = 'none';
}

function updateProgressBar() {
    let progressBar = document.getElementById('progress-bar');
    // calculate progress in percent and round the result
    let percent = ((currentQuestion + 1) / questions.length) * 100;
    percent = Math.round(percent);
    // update progress-bar
    progressBar.innerHTML = `${percent} %`;
    progressBar.style.width = `${percent}%` //auf css style attr zureifen vs html attribut?? // oder: style = 'width: ${}%'
}

function resetProgressBar() {
        let progressBar = document.getElementById('progress-bar')
        progressBar.style = ''; // set html attribute
        progressBar.style.width = '5%'; // set style attribute --> Start with 5% to display inner content
        progressBar.innerHTML = '0 %';
}

// update to next question
function getNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('question-number').innerHTML = currentQuestion + 1;
    document.getElementById('right-questions-amount').innerHTML = rightAnswers;
    //render question title
    document.getElementById('question-title').innerHTML = question['question'];
    // render answer - options
    for (let i = 1; i < 5; i++) {
        document.getElementById(`answer-${i}`).innerHTML = question[`answer_${i}`];
    }
}

// TODO: refactor function
function displayAnswer(clickedAnswerId) {
    let question = questions[currentQuestion];
    let correctAnswerId = `answer-${question['right_answer']}`;
    let nextBtn = document.getElementById('next-btn');
    
    if ( correctAnswer(question, clickedAnswerId) ) { 
        document.getElementById(clickedAnswerId).parentNode.classList.add('bg-green');
        AUDIO_SUCCESS.play();
        rightAnswers++;
    } else { 
        document.getElementById(clickedAnswerId).parentNode.classList.add('bg-red');
        document.getElementById(correctAnswerId).parentNode.classList.add('bg-green');
        AUDIO_WRONG.play();
    }
    //update progress-bar
    updateProgressBar();
    //enable next-button
    nextBtn.disabled = false;
    // TODO: disable possibility to select an answer again
    // ...
    //TODO: progr bar only shows every second question? --> wegen "overflow: hidden" in BS-Klasse .progress !! Kontainer tw zu klein!
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-btn').disabled = true;
    //toggleButtonDisable();
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons(){
    for(let i=1; i<5; i++){
        document.getElementById(`answer-${i}`).parentNode.classList.remove('bg-green');
        document.getElementById(`answer-${i}`).parentNode.classList.remove('bg-red');
    }
}

function restartQuiz() {
    rightAnswers = 0;
    currentQuestion = 0;
    document.getElementById('card-image').style = 'display:none'; // attribut src ändern
    document.getElementById('end-screen').style = 'display:none'; // auf html-attribut(!) "style" zugreifen (nicht direckt css style attribut in style.css datei?)
    document.getElementById('question-body').style = 'display: block';
    document.getElementById('progress').style.display = '';
    resetProgressBar();
    showQuestion();
}

function toggleButtonDisable() {
    let nextBtn = document.getElementById('next-btn');
    if (nextBtn.disabled){
        nextBtn.disabled = false;
    } else {
        nextBtn.disabled = true;
    }
}
