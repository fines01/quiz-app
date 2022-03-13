let currentQuestion = 0;
let rightAnswers = 0;
let AUDIO_SUCCESS = new Audio('audio/success.mp3');
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

function showEndScreen() {
     document.getElementById('end-screen').style = ''; // auf html-attribut(!) "style" zugreifen
     document.getElementById('right-questions-amount').innerHTML = rightAnswers;
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
    //render question title
    document.getElementById('question-title').innerHTML = question['question'];
    // render answer - options
    for (let i = 1; i < 5; i++) {
        document.getElementById(`answer-${i}`).innerHTML = question[`answer_${i}`];
    }
    // enable clicking on answer btns
    enableClickability();
    // stop audio
    stopAudio();
}

function checkAnswer(clickedAnswerId) {
    let nextBtn = document.getElementById('next-btn');
   
    // animate false/correct answer selection
    displayCorrectAnswer(clickedAnswerId);
    //update progress-bar
    updateProgressBar();
    //enable next-button
    nextBtn.disabled = false;
    //disable possibility to select an answer on the same question again
    enableClickability(false);
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-btn').disabled = true;
    resetAnswerButtons();
    showQuestion();
}

// disable/enable pointer events on answer-buttons:
function enableClickability(enable = true) {
    // toggleClickability() oder so?
    let answerButtons = document.getElementsByClassName('answer-card');
    for (let i=0; i<4; i++){
        if (enable){
            answerButtons[i].classList.remove('prevent-click');
        } else {
            answerButtons[i].classList.add('prevent-click');
        }
    }
}

function displayCorrectAnswer(clickedAnswerId) {
     let clickedAnswerNumber = clickedAnswerId.slice(-1); // cut out last character (index -1) of a string
     let question = questions[currentQuestion];
     let answerIsTrue = ( question["right_answer"] == clickedAnswerNumber );
     let correctAnswerId = `answer-${question['right_answer']}`;

    if (answerIsTrue) {
        document.getElementById(clickedAnswerId).parentNode.classList.add('bg-right-answer');
        AUDIO_SUCCESS.play();
        rightAnswers++;
    } else {
        document.getElementById(correctAnswerId).parentNode.classList.add('bg-right-answer');
        document.getElementById(clickedAnswerId).parentNode.classList.add('bg-wrong-answer');
        AUDIO_WRONG.play();
    }
}

function resetAnswerButtons(){
    for(let i=1; i<5; i++){
        document.getElementById(`answer-${i}`).parentNode.classList.remove('bg-right-answer');
        document.getElementById(`answer-${i}`).parentNode.classList.remove('bg-wrong-answer');
    }
}

function stopAudio() {
    AUDIO_SUCCESS.pause();
    AUDIO_SUCCESS.currentTime = 0;

    AUDIO_WRONG.pause();
    AUDIO_WRONG.currentTime = 0;
}

function restartQuiz() {
    // reset variables:
    rightAnswers = 0;
    currentQuestion = 0;

    resetProgressBar();
    showQuestion();
    enableClickability();
    
    // render quiz-card 
    document.getElementById('card-image').style = 'display:none'; // attribut src ändern
    document.getElementById('end-screen').style = 'display:none'; // auf html-attribut(!) "style" zugreifen
    document.getElementById('question-body').style = 'display: block';
    document.getElementById('progress').style.display = '';
}

function toggleMenu() {
    let menu = document.getElementById('sidebar');
    menu.classList.toggle('show-sidebar');
}
