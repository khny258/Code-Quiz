//variables
var btnGoBack = document.getElementById("btn-go-back");
var btnClearScores = document.getElementById("btn-clear-scores");
var highScoresList = document.getElementById("high-scores-list");

//counts the high score
function renderHighScores() {
    
    
    for(var i = 0; i < highScores.length; i++) {
        
            console.log(highScores[i])
        var li = document.createElement("li");
        li.textContent = highScores[i].initials.toUpperCase() + " " + highScores[i].score;

        highScoresList.appendChild(li);
    }
}

//gets the score
function getScore() {
    var storedScore = JSON.parse(localStorage.getItem("highScores") || "[]");

    if(storedScore !== null) {
        highScores = storedScore;
    }

    
    
    renderHighScores();
}

//go back function
function goBack() {
    window.location.href = "index.html";
}
 
//clear scores function
function clearScores() {
        
    highScoresList.innerHTML= "";
    localStorage.clear();                                                  
}

//click event listeners
getScore();

  btnGoBack.addEventListener("click", goBack);
  btnClearScores.addEventListener("click", clearScores);
 