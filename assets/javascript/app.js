$(document).ready(function() {



    var questions = [ "What size bikes do pro ameture supercross riders race?", 

    "At the start of a race, crossing the white line around the turn first is called?", 
    
    "What size bike do the pro's ride after the ametures?", 
    
    "How many laps are qualified for the heat races?", 
    
    "After the heat race, players from 1st to what are selected for the Main Event?", 
    
    "The players that do not qualify for the Main Event are given one more opportunity through what race?", 
    
    "The Main Event race is how many laps?", 
    
    "When riders lay their bike over during a race, what flag is waved?", 
    
    "If a rider is seriously injured in the middle of the track towards the beginning of a race, what flag is waved?", 
    
    "At the starting gate, how many seconds do the riders have to wait till the gate drops?" ];

    var answerChoice = [
        ["125cc Two Stroke, 450cc Four Stroke, 250cc Two Stroke, 250cc Four Stroke"],
        
        ["Hole-Shot", "Rider-Ahead", "The-Bonus-Rider", "Qualifier"],

        ["250cc Four Stroke, 125cc Two Stroke, 250cc Two Stroke, 450cc Four Stroke"]

        ["8 Laps, 10 Laps, 6 Laps, 4 Laps"],

        ["1st - 14th", "1st - 8th", "1st - 3rd", "1st - 11th"],

        ["Last Chance Qualifier", "Main Event Selection", "Opencross", "Areanacross"],

        ["30 Laps", "19 Laps", "21 Laps", "15 Laps" ],

        ["Orange", "Yellow", "Blue", "White"],

        ["Red", "White", "Checkered-red", "Yellow"],

        ["20 Seconds", "10 Seconds", "40 Seconds", "30 Seconds"] 

    ];
    
    var correctAnswers =
        ["250 Four Stroke",
        "Hole-Shot",
        "450 Four Stroke",
        "4 Laps",
        "1st - 11th",
        "Last Chance Qualifier",
        "21 Laps",
        "Yellow",
        "Red",
        "30 Seconds"
    ] 
    
    $(".start-button").on("click", function(){
    $(".question-table").html();
    $(".start-button").hide();
    });

    
    var userAnswer = [];
    var roundNumber = 0;

    var questionCounter = 0;
    // var imageArray = ;
    var theClock;
    // var correctTally = 0;
    var incorrectTally = 0;
    var unansweredTally = 0;
    var startScreen;
    var counter = 30;


    function timerWrapper() {
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(theClock);
                generateLossDueToTimeOut();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html();
        }
    }

    
    
    $("body").on("click", ".start-button", function(event){ 
        timerWrapper();
    
    });
    
    $(".start-button").on("click", ".answer", function(event){
        //answeredQuestion = true;
        userAnswer = $(this).text();
        if(userAnswer === correctAnswers[questionCounter]) {
            //alert("correct");
    
            clearInterval(theClock);
            generateWin();
        }
        else {
            //alert("wrong answer!");
            clearInterval(theClock);
            generateLoss();
        }
    }); // Close .answer click
    
    $("body").on("click", ".reset-button", function(event){
        resetGame();
    }); // Closes reset-button click
    
    });  //  Closes jQuery wrapper
    
    function generateLossDueToTimeOut() {
        unansweredTally++;
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000);  //  change to 4000 or other amount
    }
    
    function generateWin() {
        correctTally++;
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000);  //  change to 4000 or other amount
    }
    
    function generateLoss() {
        incorrectTally++;
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000); //  change to 4000 or other amount
    }
    
    function wait() {
        if (questionCounter < 7) {
        questionCounter++;
        counter = 30;
        timerWrapper();
        }
        else {
            finalScreen();
        }
    }
    


    
    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 30;
        timerWrapper();
    }
    
