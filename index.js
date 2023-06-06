$(document).ready(function(){

  // iniitialize variables
    var currentQuestion;
    var timeLeft = 10;
    $('#time-left').text(timeLeft);
    var score = 0;
    var highscore = 0;
    var interval;

    // get the max-number for operations from user input (slider)
    var slider = document.getElementById("slider");
    var sliderValue = document.getElementById("sliderValue");

    slider.addEventListener("input", function() {
      sliderValue.textContent = slider.value;
    });

    
    var randomNumberGenerator = function (size) {
      return Math.ceil(Math.random() * size);
    }
    
    // check to see what operation box is checked, then call the renderNewQuestion function
    const checkboxes = document.querySelectorAll('input[name="operation"]');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        if (this.checked) {
          renderNewQuestion();
        }
      });
    });

    var questionGenerator = function () {
      var question = {};
    
      const checkboxes = document.querySelectorAll('input[name="operation"]');
      checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
          var num1 = randomNumberGenerator(slider.value); // get random number based on slider
          var num2 = randomNumberGenerator(slider.value);

          // update question based on which checkbox is checked.
          switch (checkbox.value) {
            case '+':
              question.answer = num1 + num2;
              question.equation = `${num1} + ${num2}`; 
              break;
            case '-':
              if (num1 < num2) {
                num1 = num2;
                num2 = num1;
              }
              question.answer = num1 - num2;
              question.equation = `${num1} - ${num2}`;
              break;
            case '*':
              question.answer = num1 * num2;
              question.equation = `${num1} * ${num2}`;
              break;
            case '/':
              // make sure you get two numbers that, when divided by each other, equal a whole number.
              while (num1 % num2 !== 0) {
                num1 = randomNumberGenerator(slider.value); 
                num2 = randomNumberGenerator(slider.value);
              }
              question.answer = num1 / num2;
              question.equation = `${num1} / ${num2}`;
              break;

            default:
              // Handle any other cases or errors here
              break;
          }
        }
      });
    
      return question;
    }
    
    
    currentQuestion = questionGenerator();

    // creates a new question and places it into HTML
    var renderNewQuestion = function () {
      currentQuestion = questionGenerator();
      $('#equation').text(currentQuestion.equation);  
    }

    var checkAnswer = function (userInput, answer) {
      if(userInput === answer) {
        $('#user-input').val(''); // reset the user input field
        updateTimeLeft(+1); // add one second for correct answer
        updateScore(+1); // add +1 on score for correct answer
        renderNewQuestion();
      }
    }
    $('#user-input').on('keyup', function () {
      checkAnswer(Number($(this).val()), currentQuestion.answer); // compare user input value with correct answer
    });
    renderNewQuestion();

    var startGame = function () {
        if (!interval) {
            if (timeLeft === 0) {
                resetGame();
            }
            //count down each second from 10, then when it hits 0 clear the interval.
            interval = setInterval(function () {
                updateTimeLeft(-1);
                if (timeLeft === 0) {
                clearInterval(interval);
                interval = undefined;
                }
            }, 1000);  
        }
    }

      //update time left and add it to HTML.
      var updateTimeLeft = function (amount) {
        timeLeft += amount;
        $('#time-left').text(timeLeft);
      }

      // check for user input and start the timer.
      $('#user-input').on('keyup', function () {
        startGame();
        checkAnswer(Number($(this).val()), currentQuestion.answer);
      });

      // keep track of high score based on previous scores
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