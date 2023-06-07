function getComputerChoice() {
    let choices = Array("rock", "paper", "scissors");
    let choice = choices[Math.floor(Math.random()*choices.length)];
    return(choice);
};

const userChoiceImg = document.getElementById("user-choice-photo");
const computerChoiceImg = document.getElementById("computer-choice-photo");
const userChoiceAni = [{transform: "translateX(-300px)", opacity:"0"},{transform: "translateX(0px)", opacity:"1"}];
const computerChoiceAni = [{transform: "translateX(300px)", opacity:"0"},{transform: "translateX(0px)", opacity:"1"}];

function choicePhotoAnimation (playerChoice, computerChoice){
    let imgDirDict = {
        rock: "./images/rock.png",
        paper: "./images/paper.png",
        scissors: "./images/scissors.png"
    }
    userChoiceImg.src = imgDirDict[playerChoice];
    computerChoiceImg.src = imgDirDict[computerChoice];
    userChoiceImg.style.opacity = "0";
    computerChoiceImg.style.opacity = "0";
    userChoiceImg.animate(userChoiceAni, 800, 1);
    computerChoiceImg.animate(computerChoiceAni, 800, 1);
};

function playRound(computerSelection, playerSelection) {
    playerSelection = playerSelection.toLowerCase();
    let winningPairDict = {
        rock:"scissors",
        scissors: "paper",
        paper: "rock"
    };
    let returnText = "";
    let winStatus = "";
    if(computerSelection === playerSelection){
        returnText = `It was a draw you both chose ${playerSelection}!`;
        winStatus = "draw";
        choicePhotoAnimation(playerSelection, computerSelection);
        userChoiceImg.style.opacity = "1";
        return[returnText, winStatus];
    } else if (winningPairDict[playerSelection] === computerSelection) {
        returnText = `You win! ${playerSelection} beats ${computerSelection}!`;
        winStatus = "win";
        choicePhotoAnimation(playerSelection, computerSelection);
        userChoiceImg.style.opacity = "1";
        return[returnText, winStatus];
    } else {
        returnText = `You lose! ${computerSelection} beats ${playerSelection}!`;
        winStatus = "lose";
        choicePhotoAnimation(playerSelection, computerSelection);
        computerChoiceImg.style.opacity = "1";
        return[returnText, winStatus];
    };   
};

playerScore = 0;
computerScore = 0;
const playerScoreElement = document.querySelector("#player-score");
const computerScoreElement = document.querySelector("#computer-score");
const btnChoice = document.querySelectorAll(".choice-button");
btnChoice.forEach((btnElement) => {
    btnElement.addEventListener("click", () => {
        let playerChoice = btnElement.dataset.choice;
        let resultsList = playRound(getComputerChoice(), playerChoice);
        
        document.querySelector("#current-result").innerText = resultsList[0];
        const roundResultAni = [{transform: "scale(1)"},{transform: "scale(1.2)"},{transform: "scale(1)"}]
        document.querySelector("#current-result").animate(roundResultAni, 200, 1)
        
        if (resultsList[1] === "win"){
            playerScore++;
            animateScore(playerScoreElement);
        }else if (resultsList[1] === "lose"){
            computerScore++;
            animateScore(computerScoreElement);
        };

        if (playerScore > computerScore){
            playerScoreElement.style.color = "green";
            computerScoreElement.style.color = "red";
        } else if (computerScore > playerScore){
            playerScoreElement.style.color= "red";
            computerScoreElement.style.color = "green";
        } else{
            playerScoreElement.style.color = "black";
            computerScoreElement.style.color = "black";
        };
        
        if (playerScore === 5){
            alert(`You won! the score was ${playerScore}:${computerScore}`);
            resetGame();
        } else if (computerScore === 5){
            alert(`You lost! the score was ${playerScore}:${computerScore}`);
            resetGame();
        };
    });
});

const newNumAni = [{transform: "translateY(40px)", opacity:"0"},{transform: "translateY(0px)", opacity:"1"}];
const oldNumAni = [{transform: "translateY(0px)", opacity:"1"},{transform: "translateY(-40px)", opacity:"0"}];

function animateScore(roundWinnerElement){
    let roundWinnerAniId = "#" + roundWinnerElement.id + "-ani";
    const roundWinnerElementAni = document.querySelector(roundWinnerAniId);
    roundWinnerElement.innerText++;
    roundWinnerElementAni.innerText = roundWinnerElement.innerText-1;
    roundWinnerElement.animate(newNumAni, 150, 1);
    roundWinnerElementAni.animate(oldNumAni, 150, 1);
};

function resetGame(){
    playerScore = 0;
    computerScore = 0;
    playerScoreElement.innerText = 0;
    computerScoreElement.innerText = 0;
    document.querySelector("#player-score-ani").innerText = 0;
    document.querySelector("#computer-score-ani").innerText = 0;
    document.querySelector("#current-result").innerText = "";
    playerScoreElement.style.color = "black";
    computerScoreElement.style.color = "black";
};