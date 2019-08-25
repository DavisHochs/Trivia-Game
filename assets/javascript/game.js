let correctAnswers = 0;
let wrongAnswers = 0;
let unanswered = 0;
isAnswered = false;
let countdown = 30;



const  question1 = {questionOne: "What is my favorite color?", answers: ['Purple', 'Blue', 'Red', 'Yellow'], correct: 1}
    


//Setting the timer using interval rather than timeout for my own learning sake

function run() {
    intervalId = setInterval(decrement, 1000);
    
}
function decrement() {
    countdown--;
    $('#timer').text(countdown);
    if (countdown === 0) {
      inBetween();
    }
  }

//Setting the DOM with the question, answer, and timer

function setQandA() {
    $('#start').on('click', function() {
        let populateQ = $('<h1>');
        populateQ.text(question1.questionOne);
        $("#questionContainer").append(populateQ);
        for (let i = 0; i < 4; i++) {
            
            let rowDiv = $(`<div id=row${i}>`);
            let populateChoices = $('<button class="btn btn-secondary"/>');
            populateChoices.text(question1.answers[i]);
            $('#answerContainer').append(rowDiv);
            $(`#row${i}`).append(populateChoices);
            
            
        }
        $('#start').remove();
        $('#title').remove();
        run();

        
    })


}

function inBetween() {

}
$(document).ready(function() {
    setQandA();
}) 
    




