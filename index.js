$(document).ready(function(){
    var currentQuestion;
    var timeLeft = 10;
    $('#time-left').text(timeLeft);
    var score = 0;
    var highscore = 0;
    var interval;


    var slider = document.getElementById("slider");
    var sliderValue = document.getElementById("sliderValue");

    slider.addEventListener("input", function() {
      sliderValue.textContent = slider.value;
    });
    
    var randomNumberGenerator = function (size) {
      return Math.ceil(Math.random() * size);
    }
    
    var questionGenerator = function () {
      var question = {};
      var num1 = randomNumberGenerator(slider.value);
      var num2 = randomNumberGenerator(slider.value);
      
      question.answer = num1 + num2;
      question.equation = String(num1) + " + " + String(num2);
      
      return question;
    }
    
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);

    var renderNewQuestion = function () {
      currentQuestion = questionGenerator();
      $('#equation').text(currentQuestion.equation);  
    }
    var checkAnswer = function (userInput, answer) {
      if(userInput === answer) {
        renderNewQuestion();
        $('#user-input').val('');
        updateTimeLeft(+1);
        updateScore(+1);
      }
    }
    $('#user-input').on('keyup', function () {
      checkAnswer(Number($(this).val()), currentQuestion.answer);
    });
    renderNewQuestion();

    var startGame = function () {
        if (!interval) {
            if (timeLeft === 0) {
                resetGame();
            }
            interval = setInterval(function () {
                updateTimeLeft(-1);
                if (timeLeft === 0) {
                clearInterval(interval);
                interval = undefined;
                }
            }, 1000);  
        }
    }

      var updateTimeLeft = function (amount) {
        timeLeft += amount;
        $('#time-left').text(timeLeft);
      }

      $('#user-input').on('keyup', function () {
        startGame();
        checkAnswer(Number($(this).val()), currentQuestion.answer);
      });

      var updateScore = function (amount) {
        score += amount;
        $('#score').text(score);
        if (score > highscore) {
          highscore = score;
          $('#highscore').text(highscore);
        }
      };

      function resetGame () {
        clearInterval(interval);
        timeLeft = 10;
        score = 0;
        $('#score').text(score);
        $('#time-left').text(timeLeft);
        interval = undefined;
      }
    
      $('#newGame').on('click', function () {
        resetGame();
      });


  });