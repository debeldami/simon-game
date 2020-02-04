var arrOfColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var clickPattern = [];
var gameStarted = false;
var level = 0;


function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = arrOfColors[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    $("#level-title").text("level " + level);
    level++;
}

$(".btn").click(
    function () {
        var userChosenColour = this.id
        clickPattern.push(userChosenColour);
        console.log(clickPattern);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(clickPattern.length - 1);
    }
)


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] != clickPattern[currentLevel]) {
        console.log("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        playSound("wrong");
        startOver();
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 100);
    } else {
        console.log("success");
        if (currentLevel + 1 == gamePattern.length) {
            setTimeout(nextSequence, 1000);
            clickPattern = [];
        }
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    gameStarted = false;
    clickPattern = [];
}

function playSound(userChosenColour) {
    var audio = new Audio("sounds/" + userChosenColour + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    var cur = $("#" + currentColor);
    cur.addClass("pressed");
    setTimeout(function () {
        cur.removeClass("pressed");
    }, 100);
}


$(document).keydown(
    function () {
        if (!gameStarted) {
            nextSequence();
        }
        gameStarted = true;
    }
)
