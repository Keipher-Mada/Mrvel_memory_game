
var errors = 0;
var cardList = [
    "Aero",
    "Carnage",
    "Cosmo",
    "Daredevil",
    "DoctorStrange",
    "Hulk",
    "Miles",
    "Sera",
    "Thanos",
    "Thor"
]

var cardSet;
var board = [];
var rows = 4;
var columns = 5;

var card1Selected;
var card2Selected;

window.onload = function() {
    shuffleCards();
    startGame();
}

function shuffleCards() {
    cardSet = cardList.concat(cardList); //Ensure cards are always pair
    console.log(cardSet);
    //Randomise board
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length); //random index every time
        //swap
        let temp = cardSet[i];
        cardSet[i] = cardSet [j];
        cardSet[j] = temp;
    }
    console.log(cardSet);
}


function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardImg  = cardSet.pop();
            row.push(cardImg);


            let card = document.createElement("Img");
            card.id = r.toString() + "-" + c.toString();
            card.src = cardImg + ".jpg";
            card.classList.add("card");
            card.addEventListener("click", selectCard);
            document.getElementById("board").append(card);
        }
        board.push(row);
    }
    console.log(board);
    setTimeout(hideCards, 5000);
}

function hideCards() {
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns; c++ ){
             let card = document.getElementById(r.toString() + "-" + c.toString());
             card.src = "Back.jpg";
        }
    }
}

function selectCard() {

    if (this.src.includes("Back")) {
        if (!card1Selected) {
            card1Selected = this;

            let coords = card1Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1Selected.src = board[r][c] + ".jpg";
        }
        else if (!card2Selected && this != card1Selected) {
            card2Selected = this;

            let coords = card2Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

             card2Selected.src = board[r][c] + ".jpg";
            setTimeout(flip, 1000);
        }
    }

}

function flip() {
    //flip cards back if they don't match
    if (card1Selected.src != card2Selected.src) {
        card1Selected.src = "Back.jpg";
        card2Selected.src = "Back.jpg";
        errors += 1;
        document.getElementById("errors").innerText = errors;
    }

    card1Selected = null;
    card2Selected = null;
}