let correctAnswers = 0;
let wrongAnswers = 0;
let unanswered = 0;
isAnswered = false;
let countdown = 30;
let countdown2 = 5;
let questionCounter = 1;



const  questions = {
1 : {
     question: "What is my favorite color?", 
     answers: ['Purple', 'Blue', 'Red', 'Yellow'], 
     correct: 0
    },
2 : {
    question: "What day is my birthday?", 
    answers: ['July 30th', 'July 31st', 'August 31st', 'August 30th'], 
    correct: 1
},
3 : {
    question: "What is my mothers first name?",
    answers: ['Sherry', 'Sue', 'Susan', 'Sheryl'],
    correct: 2
},
4 : {
    question: "What was the name of my first dog?",
    answers: ['Sadie', 'Lucky', 'Lucy', 'Savvy'],
    correct: 0
},
5 : {
    question: "What is my liquor of choice?",
    answers: ["Whiskey", "Rum", "Tequila", "Vodka"],
    correct: 2
},

6 : {
    question: "Who is my best friend?",
    answers: ["Ian", "Alex", "Timmy", "Alyssa"],
    correct: 3
},
7 : {
    question: "Who is my favorite artist?",
    answers: ["Lil Skies", "Playboi Carti", "Lil Uzi Vert", "Drake"],
    correct: 1
},
8 : {
    question: "What is my oldest brothers name?",
    answers: ["Austin", "Chase"],
    correct: 0
},
9 : {
    question: "What is my favorite candy?",
    answers: ["Skittles", "Sweetarts", "Sour Patch Kids", "Hersheys"],
    correct: 1,
},
10 : {
    question: "What is my taco bell order?",
    answers: ["One beef quesorito", "Two beef quesoritos w/ a soft taco", "Two beef quesoritos", "Three beef quesoritos" ],
    correct: 2
}

}
    

$('#timer').text(countdown);
//Setting the timer using interval rather than timeout for my own learning sake
 

function run() {
    intervalId = setInterval(decrement, 1000);  
}
function decrement() {
    countdown--;
    $('#timer').text(countdown);
    if (countdown === 0) {
        unanswered++;
        outOfTime();

    }
  }
  


//Setting the DOM with the question, answer, and timer

function settingQuestionDOM() {
    
    countdown = 30;
    
    run();
    let populateQ = $('<h1 id="question">');
    populateQ.text(questions[questionCounter].question);
    $("#questionContainer").append(populateQ);
    for (let i = 0; i < 4; i++) {

        let rowDiv = $(`<div id=row${i}>`);
        let populateChoices = $('<button class="btn btn-info btn-block button"/>');
        populateChoices.text(questions[questionCounter].answers[i]);
        populateChoices.attr('data-answer', i)
        $('#answerContainer').append(rowDiv);
        $(`#row${i}`).append(populateChoices); 
    }
        $('.button').on('click', function() {
            if($(this).data('answer') == questions[questionCounter].correct) {
                correct();
                correctAnswers++;
                clearInterval(intervalId);
            }
            else {
                wrong();
                questionCounter++;
                wrongAnswers++;
            }
        })
}

function mainQandA() {
    
    $('#start').on('click', function() {
        settingQuestionDOM();
        $('#start').remove();
        $('#title').remove();
          
    })
    
    $('.button').on('click', function() {
        if($(this).data('answer') == questions[questionCounter].correct) {
            correct();
            correctAnswers++;
            
        }
        else {
            wrong();
            wrongAnswers++;
        }
    })


}

//Functions for right, wrong, and unanswered showing a gif for a few seconds

let correctGifQuery = 'celebration';
let wrongGifQuery = 'sad';
let noans = 'clock';

 


function correct(){
    clearInterval(intervalId);
    $('#timer').empty();
    $('.button').remove();
    $('#question').remove();
    $('#questionContainer').append(`<h1 id="giphy">Correct!!!</h1>`);
    questionCounter++;
    $('#questionContainer').append(`<button id="nextquestion" class="btn btn-primary value="Next Question/>`);
    $('#nextquestion').text("Next Question");
    $('#nextquestion').on('click', function() {
        if (questionCounter < 11) {
            settingQuestionDOM();
            $('postGif').remove();
            $(this).remove();
            $('#giphy').remove();
        }
        else if (questionCounter == 11) {
                $('#nextquestion').remove();
                $('#giphy').remove();
                let correct = $(`<h3>You got ` + correctAnswers + ` questions right!</h3>`);
                let wrong = $(`<h3>You got ${wrongAnswers} questions wrong!</h3>`);
                let noanswer =$(`<h3>You did not answer ${unanswered} questions!</h3>`);
                console.log(wrongAnswers)
                $('#questionContainer').append(`<h1 id="game-over"> Game Over!</h1>`);
                $('#game-over').append(correct, wrong, noanswer);
        
            }
    })
    let queryURL = "https://api.giphy.com/v1/gifs/random?api_key=VumF18uoV5t88Tij8FxSFFaGth98OuL9&tag=" + correctGifQuery 
    
    $.ajax({
        url: queryURL,
        method: 'GET',
    }).then(function(response){
        let gifDisplay = $('<img id="postGif">');
        let imageUrl = response.data.image_original_url;
        gifDisplay.attr('src', imageUrl);
        $('.container').append(gifDisplay);
    });


}
function wrong() {
    clearInterval(intervalId);
    $('#timer').remove();
    $('.button').remove();
    $('#question').remove();
    $('#questionContainer').append(`<h1 id="giphy">Wrong!!!</h1>`);
    questionCounter++;
    $('#questionContainer').append(`<button id="nextquestion" class="btn btn-primary value="Next Question/>`);
    $('#nextquestion').text("Next Question");
    $('#nextquestion').on('click', function() {
        if (questionCounter < 11) {
            settingQuestionDOM();
            $(this).remove();
            $('#giphy').remove();
        }
        else if (questionCounter == 11) {
                $('#nextquestion').remove();
                $('#giphy').remove();
                let correct = $(`<h3>You got ` + correctAnswers + ` questions right!</h3>`);
                let wrong = $(`<h3>You got ${wrongAnswers} questions wrong!</h3>`);
                let noanswer =$(`<h3>You did not answer ${unanswered} questions!</h3>`);
                console.log(wrongAnswers)
                $('#questionContainer').append(`<h1 id="game-over"> Game Over!</h1>`);
                $('#game-over').append(correct, wrong, noanswer);
        
            }
    })
}
function outOfTime() {
    
    clearInterval(intervalId);
    $('#timer').remove();
    $('.button').remove();
    $('#question').remove();
    $('#questionContainer').append(`<h1 id="giphy">Time's Up!!!</h1>`);
    questionCounter++;
    $('#questionContainer').append(`<button id="nextquestion" class="btn btn-primary value="Next Question/>`);
    $('#nextquestion').text("Next Question");
    $('#nextquestion').on('click', function() {
        if (questionCounter < 11) {
            settingQuestionDOM();
            $(this).remove();
            $('#giphy').remove();
        }
        else if (questionCounter == 11) {
                $('#nextquestion').remove();
                $('#giphy').remove();
                let correct = $(`<h3>You got ` + correctAnswers + ` questions right!</h3>`);
                let wrong = $(`<h3>You got ${wrongAnswers} questions wrong!</h3>`);
                let noanswer =$(`<h3>You did not answer ${unanswered} questions!</h3>`);
                console.log(wrongAnswers)
                $('#questionContainer').append(`<h1 id="game-over"> Game Over!</h1>`);
                $('#game-over').append(correct, wrong, noanswer);
        
            }
    })
}




$(document).ready(function() {
    mainQandA();
}) 
    




