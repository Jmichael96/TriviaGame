var openScreen;
    var gameHTML;
    var counter = 30;
    var questionArray = 
    [ "What size bikes do pro ameture supercross riders race?", 
    "At the start of a race, crossing the white line around the turn first is called?",
    "What size bike do the pro's ride after the ametures?", 
    "How many laps are qualified for the heat races?",
    "After the heat race, players from 1st to what are selected for the Main Event?",
    "The players that do not qualify for the Main Event are given one more opportunity through what race?", 
    "The Main Event race is how many laps?",
    "When riders lay their bike over during a race, what flag is waved?",
    "If a rider is seriously injured in the middle of the track towards the beginning of a race, what flag is waved?",
    "At the starting gate, how many seconds do the riders have to wait till the gate drops?"];
    var answerArray = [
    ["125cc Two Stroke", "450cc Four Stroke", "250cc Two Stroke", "250cc Four Stroke"], 
    ["Hole-Shot", "Rider-Ahead", "The-Bonus-Rider", "Qualifier",],
    ["250cc Four Stroke", "125cc Two Stroke", "250cc Two Stroke","450cc Four Stroke"], 
    ["8 Laps","10 Laps","6 Laps","4 Laps"],
    ["1st - 14th", "1st - 8th", "1st - 3rd","1st - 11th"],
    ["Last Chance Qualifier","Main Event Selection","Opencross","Areanacross" ],
    ["30 Laps","19 Laps","21 Laps","15 Laps"],
    ["Orange","Blue","Yellow","White",],
    ["Red", "White","Checkered-red","Yellow"],
    ["20 Seconds","10 Seconds","40 Seconds","30 Seconds" ],];

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

    var correctAnswers = 
    [ "D. 250cc Four Stroke", 
    "A. Hole-Shot", 
    "D. 450cc Four Stroke", 
    "D. 4 Laps", 
    "D. 1st - 11th", 
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

    $("#wall-music").on("click", function() {
        wallSound.play();
        });
    $("#wall-pause").on("click", function() {
        wallSound.pause();
        });

    function openingPage() {
        wallSound.play();
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
    
    $("body").on("click", ".answer", function(event){
        clickSound.play();
        selectedAnswer = $(this).text();
        
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
    
    $("body").on("click", ".reset-button", function(event){
        clickSound.play();
        resetGame();
    });
    
    });
    
    function timeoutLoss() {
        unanswerd++;
        gameHTML = "<p class='text-center timer-p timer-style'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center' id='question-style'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-fluid img-wrong' src='./assets/images/x.gif'>";
        $("#mainArea").html(gameHTML);
        setTimeout(wait, 3000);  
    }
    
    function generateWin() {
        correct++;
        gameHTML = "<p class='text-center timer-p timer-style'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center' id='question-style'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
        $("#mainArea").html(gameHTML);
        winSound.play(3000);
        setTimeout(wait, 3000);  
    }
    
    function generateLoss() {
        incorrect++;
        gameHTML = "<p class='text-center timer-p timer-style'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center' id='question-style'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-fluid img-wrong' src='./assets/images/x.gif'>";
        $("#mainArea").html(gameHTML);
        setTimeout(wait, 3000); 
    }
    

    function generateQuestions() {
        gameHTML = "<p class='text-center timer-p timer-style'>Time Remaining: <span class='timer'>30</span></p><p class='text-center' id='question-style'>" + questionArray[questionCounter] + "</p><p class='first-answer answer' id='answers-style'>A. " + answerArray[questionCounter][0] + "</p><p class='answer' id='answers-style'>B. "+answerArray[questionCounter][1]+"</p><p class='answer' id='answers-style'>C. "+answerArray[questionCounter][2]+"</p><p class='answer' id='answers-style'>D. "+answerArray[questionCounter][3]+"</p>";
        $("#mainArea").html(gameHTML);
        winSound.pause();
    };
    
    function wait() {

    if(questionCounter < 9){ 
        questionCounter++;
        generateQuestions();
        counter = 30;
        timerWrapper(); 
    }
    else{    
       finalScreen();
    }
    }; //end function
    
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
        }
    }
    
    function finalScreen() {
        gameHTML =  "<p class='text-center timer-style'>Your Final Results!" + "</p>" + "<p class='summary-correct' id='question-style'>Correct Answers: " + correct + "</p>" + "<p id='question-style'>Wrong Answers: " + incorrect + "</p>" + "<p id='question-style'>Unanswered: " + unanswerd + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-md btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $("#mainArea").html(gameHTML);
    }
    
    function resetGame() {
        questionCounter = 0;
        correct = 0;
        incorrect = 0;
        unanswerd = 0;
        counter = 30;
        generateQuestions();
        timerWrapper();
    };