let buttonColours = ["red", "blue", "green", "yellow"]

let gamePattern = []

let userClickedPattern = []

let started = false;

let level = 0;


$(document).keydown(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true
    }
})

$(".box").click(function handler() {
    
    // let userChosenColour = $(this).attr("id")
    let userChosenColour = this.id
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour)
    animate(userChosenColour)
    

    checkAnswer(userClickedPattern.length-1);
})

function nextSequence() {
     
    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour);
    // console.log(gamePattern);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour)
    
    level++;

    $("#level-title").text("Level " + level)

    userClickedPattern = []
}
function playSound(name) {

    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play()
    
}

function animate(currentColour){

    $("#" + currentColour).addClass("pressed")
    
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        // console.log("Success")

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence()
            }, 1000)
        }

    } else {
        // console.log("Wrong")

        playSound("wrong")

        $("#game-area").addClass("game-over")
        setTimeout(function(){
            $("#game-area").removeClass("game-over")  
        }, 200)  
        
        $("#level-title").text("Game Over, Press any key to restart")

        startOver()
    }
}


function startOver() {
    
    level = []
    gamePattern = []
    started = false
    
}