var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

//function to add new color to the sequence.
function nextSequence() {
  level++;
  var randomNumber = Math.floor(Math.random() * 3);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(200)
    .fadeIn(200);
  playSound(randomChosenColour);
}

//function to play sound

function playSound(colour) {
  var audio = new Audio("./sounds/" + colour + ".mp3");
  audio.play();
}

//function to animate press by user
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//function to check answer
function checkAnswer() {
  var currentIndex = userClickedPattern.length - 1;
  if (userClickedPattern[currentIndex] === gamePattern[currentIndex]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
        $("h1").text("Level " + level);
      }, 600);
    }
  } else if (level > 0) {
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key or Button to Restart");
    playSound("wrong");
    setTimeout(function () {
      $("body").removeClass("game-over");
      level = 0;
    }, 300);
  }
}

//to constantly append the userclicked pattern
$(".btn").click(function () {
  userClickedPattern.push(this.id);
  playSound(this.id);
  animatePress(this.id);
  checkAnswer();
});

//to start the game via keypress
$(document).keypress(function () {
  if (level === 0) {
    userClickedPattern = [];
    gamePattern = [];
    nextSequence();
    $("h1").text("Level " + level);
  }
});

//to start game via button press.
$(".btn").click(function () {
  if (level === 0) {
    userClickedPattern = [];
    gamePattern = [];
    nextSequence();
    $("h1").text("Level " + level);
  }
});
