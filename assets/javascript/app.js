var openScreen;
    var gameHTML;
    var counter = 30;
    var questionArray = 
    //question 1
    [ "What size bikes do pro ameture supercross riders race?",
    //question 2 
    "At the start of a race, crossing the white line around the turn first is called?",
    //question 3
    "What size bike do the pro's ride after the ametures?", 
    //question 4
    "How many laps are qualified for the heat races?",
    //question 5
    "After the heat race, players from 1st to what are selected for the Main Event?",
    //question 6
    "The players that do not qualify for the Main Event are given one more opportunity through what race?",
    //question 7
    "The Main Event race is how many laps?",
    //question 8
    "When riders lay their bike over during a race, what flag is waved?",
    //question 9
    "If a rider is seriously injured in the middle of the track towards the beginning of a race, what flag is waved?",
    //question 10
    "At the starting gate, how many seconds do the riders have to wait till the gate drops?"];
    var answerArray = [
    //answer 1
    ["125cc Two Stroke", "450cc Four Stroke", "250cc Two Stroke", "250cc Four Stroke"], 
    //answer 2
    ["Rider-Ahead", "Hole-Shot", "The-Bonus-Rider", "Qualifier",],
    //answer 3
    ["250cc Four Stroke", "125cc Two Stroke", "250cc Two Stroke","450cc Four Stroke"], 
    //answer 4
    ["8 Laps","10 Laps","6 Laps","4 Laps"],
    //answer 5
    ["1st - 14th", "1st - 11th", "1st - 8th", "1st - 3rd"],
    //answer 6
    ["Last Chance Qualifier","Main Event Selection","Opencross","Areanacross" ],
    //answer 7
    ["30 Laps","19 Laps","21 Laps","15 Laps"],
    //answer 8
    ["Orange","Blue","Yellow","White",],
    //answer 9
    ["Red", "White","Checkered-red","Yellow"],
    //answer 10
    ["20 Seconds","10 Seconds","40 Seconds","30 Seconds" ],];

    // image array for each correct answer
    var imageArray = new Array(); 
    imageArray[0] = "<img class='center-block img-fluid mb-3' src='./assets/images/q1.jpg'>";
    imageArray[1] = "<img class='center-block img-fluid mb-3' src='./assets/images/q2.jpg'>"; 
    imageArray[2] = "<img class='center-block img-fluid mb-3' src='./assets/images/q3.jpg'>"; 
    imageArray[3] = "<img class='center-block img-fluid mb-3' src='./assets/images/q4.jpg'>";  
    imageArray[4] = "<img class='center-block img-fluid mb-3' src='./assets/images/q5.jpg'>"; 
    imageArray[5] = "<img class='center-block img-fluid mb-3' src='./assets/images/q6.jpg'>"; 
    imageArray[6] = "<img class='center-block img-fluid mb-3' src='./assets/images/q7.jpg'>"; 
    imageArray[7] = "<img class='center-block img-fluid mb-3' src='./assets/images/q8.jpg'>"; 
    imageArray[8] = "<img class='center-block img-fluid mb-3' src='./assets/images/q9.jpg'>"; 
    imageArray[9] = "<img class='center-block img-fluid mb-3' src='./assets/images/q10.jpg'>"; 

    //array with all correct answers for each question
    var correctAnswers = 
    [ "D. 250cc Four Stroke", 
    "B. Hole-Shot", 
    "D. 450cc Four Stroke", 
    "D. 4 Laps", 
    "B. 1st - 11th", 
    "A. Last Chance Qualifier", 
    "C. 21 Laps", 
    "C. Yellow",
    "A. Red",
    "D. 30 Seconds"];

    var correct = 0;
    var incorrect = 0;
    var unanswerd = 0;
    var questionCounter = 0;
    var userAnswer;
    var theClock;
    var clickSound = new Audio("./assets/sound/clicksound.mp3");
    var winSound = new Audio("./assets/sound/gatewin.mp3");
    var wallSound = new Audio("./assets/sound/back.mp3");

$(document).ready(function() {

    //the option to play or pause my background music
    $("#wall-music").on("click", function() {
        wallSound.play();
        console.log("You Played the Music!")
        });
    $("#wall-pause").on("click", function() {
        wallSound.pause();
        console.log("You Paused the Music!")
        });

     //opening page for the start of the game
    function openingPage() {
        openScreen = "<p class='text-center main-button-container'><a class='btn btn-md btn-block start-button' href='#' role='button'>Start Trivia Game</a></p>"; 
        $("#mainArea").append(openScreen);
    }
    
    openingPage();
    
        $("#mainArea").on("click", ".start-button", function(event){
        clickSound.play();
        $('.jumbotron').hide();
            
        generateQuestions();
    
        timerWrapper();

    });
    
    //my user answer selection. 
    $("body").on("click", ".answer", function(event){
        clickSound.play();
        selectedAnswer = $(this).text();
        console.log("You Selected " + selectedAnswer);    
        if(selectedAnswer === correctAnswers[questionCounter]) {
            //alert("correct");
            clearInterval(theClock);
            generateWin();
        }
            else{
            //alert("wrong answer!");
            clearInterval(theClock);
            generateLoss();
            }
    });
    
    //my reset button 
    $("body").on("click", ".reset-button", function(event){
        clickSound.play();
        resetGame();
    });
    
    });
    
    //if user is lazy and doesnt select anything we generate a timeout loss and user gets deducted for an unanswered question
    function timeoutLoss() {
        unanswerd++;
        gameHTML = "<p class='text-center timer-p timer-style'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center' id='question-style'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>";
        $("#mainArea").html(gameHTML);
        setTimeout(wait, 3000);  
    };
    //if user guess is correct we generate a win! woop woop
    function generateWin() {
        correct++;
        gameHTML = "<p class='text-center timer-p timer-style'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center' id='question-style'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
        $("#mainArea").html(gameHTML);
        winSound.play(3000);
        setTimeout(wait, 3000);
        console.log("You Guessed Correct! " + correct);  
    };
    
    //if user guess is incorrect we generate a loss
    function generateLoss() {
        incorrect++;
        gameHTML = "<p class='text-center timer-p timer-style'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center' id='question-style'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>";
        $("#mainArea").html(gameHTML);
        setTimeout(wait, 3000);
        console.log("You Guessed Incorrect ! " + incorrect);  
 
    };
    //generates and displays questions
    function generateQuestions() {
        gameHTML = "<p class='text-center timer-p timer-style'>Time Remaining: <span class='timer'>30</span></p><p class='text-center' id='question-style'>" + questionArray[questionCounter] + "</p><p class='first-answer answer' id='answers-style'>A. " + answerArray[questionCounter][0] + "</p><p class='answer' id='answers-style'>B. "+answerArray[questionCounter][1]+"</p><p class='answer' id='answers-style'>C. "+answerArray[questionCounter][2]+"</p><p class='answer' id='answers-style'>D. "+answerArray[questionCounter][3]+"</p>";
        $("#mainArea").html(gameHTML);
        winSound.pause();
    };    
    //generating the wait function for each question and moving on to the next question
    function wait() {
    if(questionCounter < 9){ 
        questionCounter++;
        generateQuestions();
        counter = 30;
        timerWrapper(); 
    }
    else{    
       finalScreen();
    };
    }; 

    //my timer function
    function timerWrapper() {
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(theClock);
                timeoutLoss();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        };
    };
    //end game screen with results
    function finalScreen() {
        gameHTML =  "<p class='text-center timer-style'>Your Final Results!" + "</p>" + "<p class='summary-correct' id='question-style'>Correct Answers: " + correct + "</p>" + "<p id='question-style'>Wrong Answers: " + incorrect + "</p>" + "<p id='question-style'>Unanswered: " + unanswerd + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-md btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $("#mainArea").html(gameHTML);
    };
    // optional reset game button
    function resetGame() {
        questionCounter = 0;
        correct = 0;
        incorrect = 0;
        unanswerd = 0;
        counter = 30;
        generateQuestions();
        timerWrapper();
    };
