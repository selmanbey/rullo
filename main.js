document.addEventListener("DOMContentLoaded", function(){

    //// VARIABLES /////////////////////////////////////////////////////////////////

    const table = document.getElementById('board');
    const gameon = document.getElementById('gameon');
    const gameopening = document.getElementById('gameopening')
    const gamewon = document.getElementById("gamewon")
    const replay = document.getElementById("replay")
    const allGridButtons = document.querySelectorAll(".grid")


    var gameNumbers = [];
    var gameNumbersByCol = [];

    var dynamicGameNumbers = [];
    var dynamicGameNumbersByCol = [];

    var indexesToBeExcluded = [];
    var targets = [];
    var targetsByCol = [];

    var row = 5;
    var col = 5;
    var upperLimit = 9;


    //// FUNCTIONS ////////////////////////////////////////////////////////////////////

    function createGrid(expression) {
        switch(expression) {
            case "b3":
                row = 3;
                col = 3;
                break;
            case "b4":
                row = 4;
                col = 4;
                break; 
            case "b5":
                row = 5;
                col = 5;
                break; 
            case "b6":
                row = 6;
                col = 6;
                break;
            case "b7":
                row = 7;
                col = 7;
                break;    
            case "b8":
                row = 8;
                col = 8;
                break;  
            case "b9":
                row = 9;
                col = 9;
                break;  
            case "b10":
                row = 10;
                col = 10;
                break;  
        }
    }

    function createRowNumbers(row, upperLimit) {
        let rowNumbers = [];

        for (let i=0; i < row; i++) {
            let randomNumber = Math.round(Math.random() * upperLimit);
            rowNumbers.push(randomNumber);
        }
        return rowNumbers;
    };
    
    function createGameNumbers(row, col) {
        let gameNumbers = [];

        for (let i=0; i < col; i++) {
            let rowNumbers = createRowNumbers(row, upperLimit);
            gameNumbers.push(rowNumbers);
        }
        return gameNumbers;     
    }

    function createGameNumbersByCol(gameNumbers) {
        let gameNumbersByCol = [];

        for (let i = 0; i < gameNumbers.length; i++) {
            let colNumbers = []
            for (let j = 0; j < gameNumbers[i].length; j++){
                colNumbers.push(gameNumbers[j][i])
            }
            gameNumbersByCol.push(colNumbers)
        }

        return gameNumbersByCol;
    }

    function createTableInnerHTML(row, col, gameNumbers) {
        let tableInnerHTML = "";

        for (let i=0; i < row; i++) {
            tableInnerHTML += "<tr id=\"" + String(i + 1) + "\">\n";
            for (let j=0; j < col; j++) {
                tableInnerHTML += "\t<td id=\"" + String(i + 1) + String(j + 1) + "\" class=\"active_cell\">" + String(gameNumbers[i][j]) + "</td>\n";
            };
            tableInnerHTML += "<td class=\"empty\"></td>"
            tableInnerHTML += "<td id=\"countrow" + String(i + 1) + "\" class=\"count\"></td>"
            tableInnerHTML += "<td class=\"empty2\"></td>"
            tableInnerHTML += "<td id=\"targetrow" + String(i + 1) + "\" class=\"target\"></td>"
            tableInnerHTML += "</tr>\n";
        };

        tableInnerHTML += "<tr class=\"empty\"></tr>"

        for (let n=0; n < col; n++) {
            tableInnerHTML += "<td id=\"countcol" + String(n + 1) + "\" class=\"count\">\n";
        }

        tableInnerHTML += "<tr class=\"empty2\"></tr>"

        for (let n=0; n < col; n++) {
            tableInnerHTML += "<td id=\"targetcol" + String(n + 1) + "\" class=\"target\">\n";
        }

        return tableInnerHTML;
    };

    function checkTotalwithTarget(cell, target) {
        if (cell.innerHTML == target.innerHTML) {
            cell.style.backgroundColor = "#3F5E50"
            console.log("success")
        } else {
            cell.style.backgroundColor = "#802717"
        }

    }

    function createCountsForRows(gameNumbers) {
        for(let i=0; i < gameNumbers.length; i++) {
            let total = 0
            for (let j=0; j < gameNumbers[i].length; j++) {
                total += gameNumbers[i][j]
            }
            elementID = "countrow" + String(i+1)
            targetID = "targetrow" + String(i+1)
            let cell = document.getElementById(elementID)
            let target = document.getElementById(targetID)
            cell.innerHTML = total 
            checkTotalwithTarget(cell, target);
        }        
    } 

    function createCountsForCols(gameNumbersByCol) {
        for(let i=0; i < gameNumbersByCol.length; i++) {
            let total = 0
            for (let j=0; j < gameNumbersByCol[i].length; j++) {
                total += gameNumbersByCol[i][j]
            }
            elementID = "countcol" + String(i+1)
            targetID = "targetcol" + String(i+1)
            let cell = document.getElementById(elementID)
            let target = document.getElementById(targetID)
            cell.innerHTML = total 
            checkTotalwithTarget(cell, target);
        }   
    }

    function createAllTheCounts(gameNumbers, gameNumbersByCol) {
        createCountsForRows(gameNumbers);
        createCountsForCols(gameNumbersByCol);
    }

    function getIndexesForExclusion(row, col, gameNumbers) {
        let indexesToBeExcluded = []

        for (let i=0; i < row + col; i++) {
            let randomNumber1 = Math.round(Math.random() * (row - 1));
            let randomNumber2 = Math.round(Math.random() * (col - 1));
            indexesToBeExcluded.push([randomNumber1, randomNumber2]);
        }

        return indexesToBeExcluded;
    }

    function excludeNumbers(gameNumbers, indexesToBeExcluded) {  
        indexesToBeExcluded.forEach( function(e) {
            targets[e[0]][e[1]] = 0
        })

        indexesToBeExcluded.forEach( function(e){
            targetsByCol[e[1]][e[0]] = 0
        })
    }

    function createTargetsForRows(targets) {
        for(let i=0; i < targets.length; i++) {
            let total = 0
            for (let j=0; j < targets[i].length; j++) {
                total += targets[i][j]
            }
            elementID = "targetrow" + String(i+1)
            let cell = document.getElementById(elementID)
            cell.innerHTML = total 
        }        
    } 

    function createTargetsForCols(targetsByCol) {
        for(let i=0; i < targetsByCol.length; i++) {
            let total = 0
            for (let j=0; j < targetsByCol[i].length; j++) {
                total += targetsByCol[i][j]
            }
            elementID = "targetcol" + String(i+1)
            let cell = document.getElementById(elementID)
            cell.innerHTML = total 
        }        
    } 

    function checkDynamicWithTarget(dynamicGameNumbers, targets) {
        for(let i = 0; i < targets.length; i++){
            for(let j=0; j < targets[0].length; j++) {
                console.log(i, j)
                if (dynamicGameNumbers[i][j] !== targets[i][j]) {
                    console.log(dynamicGameNumbers[i][j], targets[i][j])
                    console.log("false")
                    return false;
                }
            }
        }
        console.log("all executed, true returned")
        return true
        
    }

    function deactivateCell(event) {
        cellID = String(event.id);

        if (event.className == "inactive_cell") {
            number = gameNumbers[parseInt(cellID[0])-1][parseInt(cellID[1]-1)];
            dynamicGameNumbers[parseInt(cellID[0])-1][parseInt(cellID[1]-1)] = number;
            dynamicGameNumbersByCol[parseInt(cellID[1])-1][parseInt(cellID[0]-1)] =number;
            event.className = "active_cell";
        } else if (event.className == "active_cell") {   
            dynamicGameNumbers[parseInt(cellID[0])-1][parseInt(cellID[1]-1)] = 0;
            dynamicGameNumbersByCol[parseInt(cellID[1])-1][parseInt(cellID[0]-1)] = 0
            event.className = "inactive_cell";
        }
    }

    function doAllTheThings() {
        event = this;
        deactivateCell(event);
        createAllTheCounts(dynamicGameNumbers, dynamicGameNumbersByCol);
        result = checkDynamicWithTarget(dynamicGameNumbers, targets);
        if (result) {
            gameon.style.display = "none"
            gamewon.style.display = "block"
        }
    }
  
    function startTheGame() {
        gameopening.style.display = "none"
        gameon.style.display = "block"
    }

    function setTheGameVariables() {
        gameNumbers = createGameNumbers(row, col);
        gameNumbersByCol = createGameNumbersByCol(gameNumbers);

        dynamicGameNumbers = JSON.parse(JSON.stringify(gameNumbers));
        dynamicGameNumbersByCol = JSON.parse(JSON.stringify(gameNumbersByCol));

        indexesToBeExcluded = getIndexesForExclusion(row, col, gameNumbers)
        targets = JSON.parse(JSON.stringify(gameNumbers));
        targetsByCol = JSON.parse(JSON.stringify(gameNumbersByCol));
        excludeNumbers(gameNumbers, indexesToBeExcluded);

        table.innerHTML = createTableInnerHTML(row, col, gameNumbers); 
        createTargetsForRows(targets);
        createTargetsForCols(targetsByCol);

        createAllTheCounts(gameNumbers, gameNumbersByCol)
    }


    /// EVENT HANDLERS //////////////////////////////////////////////////////////////////

    allGridButtons.forEach(function(e){
        e.addEventListener("click", function(expression) {
            expression = e.id;
            createGrid(expression);
            setTheGameVariables();
            startTheGame();

            let allTableCells = document.querySelectorAll("td")
    
            allTableCells.forEach(function(e){
                e.addEventListener("click", doAllTheThings);
            });
        });
    })

    replay.addEventListener("click", function(){
        gameopening.style.display = "block";
        gamewon.style.display = "none";
    })
    
});