$(document).ready(function() {


    //set up Global variables
        totalQuiz = 10;
        correctAnswer = 0;
        incorrectAnswer = 0;
        noAnswer = 0;
        questionIndex = 0;
        count = 30;


    //set up questions and answers
    var questions = [
        // question 1
        {
            "question":"What size bikes do pro ameture supercross riders race?", 
            "choices": ["125cc Two Stroke", "450cc Four Stroke", "250cc Two Stroke", "250cc Four Stroke"],
            "answer": 3
        },
        // question 2
        {
            "question": "At the start of a race, crossing the white line around the turn first is called?",
            "choices": ["Hole-Shot", "Rider-Ahead", "The-Bonus-Rider", "Qualifier",],
            "answer": 0
        },
        // question 3
        {
            "question": "What size bike do the pro's ride after the ametures?",
            "choices": ["250cc Four Stroke", "125cc Two Stroke", "250cc Two Stroke","450cc Four Stroke"],
            "answer": 3
        },
        // question 4
        {
            "question": "How many laps are qualified for the heat races?",
            "choices": ["8 Laps","10 Laps","6 Laps","4 Laps"],
            "answer": 3
        },
        // question 5
        {
            "question":"After the heat race, players from 1st to what are selected for the Main Event?", 
            "choices": ["1st - 14th", "1st - 8th", "1st - 3rd","1st - 11th"],
            "answer": 3
        },
        // question 6
        {
            "question": "The players that do not qualify for the Main Event are given one more opportunity through what race?",
            "choices": ["Last Chance Qualifier","Main Event Selection","Opencross","Areanacross" ],
            "answer": 0
        },
        // question 7
        {
            "question":"The Main Event race is how many laps?", 
            "choices": ["30 Laps","19 Laps","21 Laps","15 Laps"],
            "answer": 2
        },
        // question 8
        {
            "question": "When riders lay their bike over during a race, what flag is waved?",
            "choices": ["Orange","Yellow","Blue","White",],
            "answer": 1
        },
        // question 9
        {
            "question": "If a rider is seriously injured in the middle of the track towards the beginning of a race, what flag is waved?",
            "choices": ["Red", "White","Checkered-red","Yellow"],
            "answer": 0
        },
        // question 10
        {
            "question": "At the starting gate, how many seconds do the riders have to wait till the gate drops?",
            "choices": ["20 Seconds","10 Seconds","40 Seconds","30 Seconds" ],
            "answer": 3
        }
    ];

    //load new question to DOM
    function loadQuestion() {
        //if we have not completed all the questions..
        if (questionIndex < questions.length) {
            //display question
            $('#questions').html(questions[questionIndex].question);
            //display possible answers
            $("#0").text(questions[questionIndex].choices[0]);
            $("#1").text(questions[questionIndex].choices[1]);
            $("#2").text(questions[questionIndex].choices[2]);
            $("#3").text(questions[questionIndex].choices[3]);
        } else {
            clearInterval(timer);
            $("#quiz, #timer").hide("slow");
            $("#results").show("slow");
            scoreCount();

        }
    };

    //user selection - check answer - if else for correct or incorrect

    $(".mc").click(function() {
        userGuess = $(this).attr("id");
        //check for correct answer
        if (userGuess == questions[questionIndex].answer) {
            correct = correctAnswer++;
            console.log(correct+1 + " correct");
        } else {
            incorrect = incorrectAnswer++;
            console.log(incorrect+1 + " incorrect");
        }
        questionIndex++;
        loadQuestion();
    });

    //score count for result page

    //check how many questions were blank by subtracting the if/else values from above from the total number of questions.
    function scoreCount() {
        var totalAnswered = correctAnswer + incorrectAnswer;
        console.log(totalAnswered);
        if (totalAnswered !== totalQuiz) {
            blank = totalQuiz - totalAnswered;
        }else{
            blank = 0;
        }

        $('#correct').html(" " + correctAnswer);
        $('#incorrect').html(" " + incorrectAnswer);
        $("#blank").html(" " + blank);
    } //end scoreCount
    //hide quiz until click play\\
    $("#quiz, #results").hide();

    //questions show and timer begins\\

    $("#play").click(function() {
        $("#start").hide("slow");
        $("#quiz").show("slow");
        loadQuestion();

        //Setup timer to countdown from 60 seconds total to answer all questions

        var startTimer = setInterval(function() {
            count--;
            $("#countdown").html(count);

            //if user runs out of time before completing questions, go to results page.

            if (count === 0) {
                clearInterval(timer);
                $("#quiz, #timer").hide("slow");
                $("#results").show("slow");
                scoreCount();
            }
        }, 1000);
  
    });
    
    //restart button refreshes page back to start screen//

    $("#restart").click(function() {
        location.reload();
    });

});