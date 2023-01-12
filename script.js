let wordLength = 0;
let foundLetters = 0;
let wrongAnswers = 0;
let secretWord = '';
let searchedLetters = '';
let verifyLetter = '';
let letters = /^[a-z]+$/;

function validateWord(word) {
    if (word.match(letters)) {
        startGame();
    } else {
        resetSection('newSecretWord');
        alert('Please input lower case letters of the english alphabet');
    }
}

function validateLetter(letter) {
    if (letter.match(letters) && letter.length == 1) {
        searchLetter();
    } else {
        resetSection('inputLetter');
        alert('Please input lower case letters of the english alphabet one by one');
    }
}

function startGame() {
   secretWord = document.getElementById('newSecretWord').value;
   wordLength = secretWord.length;
   generateTableGame();
   displaySection('insertWord', 0);
   displaySection('gameSection', 1);
   if(document.querySelector('#hideHistory').checked) {
    displaySection('wrongLettersCard', 0);
   } else {
    displaySection('wrongLettersCard', 1);
   }
}

function generateTableGame() {
    document.getElementById('wordTable').innerHTML = `
        <center>
            <table id="table">
                <tr id="tableHead"></tr>
            </table>
        </center>
        `;
    for (let i = 0; i < wordLength; ++i) {
        document.getElementById('tableHead').innerHTML += ` 
            <td>
                <div id="${i}" style="display: none">
                    ${secretWord[i]}
                <div>
            </td>
        `;
    }
}

function searchLetter() {
    let aux = 0;
    verifyLetter = document.getElementById('inputLetter').value;
    for (let i = 0; i < wordLength; ++i) {
        if(verifyLetter == secretWord[i] && !searchedLetters.includes(verifyLetter) && foundLetters < wordLength && wrongAnswers < 10) {
            displaySection(i, 1);
            ++aux;
            ++foundLetters
        }
    }
    if (aux == 0 && !searchedLetters.includes(verifyLetter) && foundLetters < wordLength && wrongAnswers < 10) {
        document.getElementById('insertedLetters').innerHTML += `
            ${verifyLetter};   
        `;
        ++wrongAnswers;
        displaySection('wrong'+wrongAnswers, 1);
    }
    verifyFinalGame();
}

function displaySection(containerID, value) {
    if (value == 1) {
        document.getElementById(containerID).style.display= "";
    } else if (value == 0) {
        document.getElementById(containerID).style.display= "none";
    }
}

function resetSection(containerID) {
    document.getElementById(containerID).value= '';
}

function verifyFinalGame() {
    if (!searchedLetters.includes(verifyLetter) && foundLetters < wordLength && wrongAnswers < 10) {
        searchedLetters += verifyLetter;
        resetSection('inputLetter');
    } else if (foundLetters == wordLength) {
        document.getElementById('resultText').innerHTML = `
            You Win &#128521
        `;
        displaySection('resultCard', 1);
    } else if (wrongAnswers == 10) {
        document.getElementById('resultText').innerHTML = `
            You Lose &#128542
            <br>
            Be optimistic and try again!
        `;
        displaySection('resultCard', 1);
    }
}

function restartGame() {
    resetSection('wordTable');
    resetSection('resultText');
    displaySection('resultCard', 0);
    resetSection('inputLetter');
    document.getElementById('insertedLetters').innerHTML =``;
    for (let i = 1; i <= 10; ++i) {
        displaySection('wrong'+i, 0);
    }
    displaySection('gameSection', 0);
    resetSection('newSecretWord');
    document.getElementById('hideHistory').checked = false;
    displaySection('insertWord', 1);
    wordLength = 0;
    foundLetters = 0;
    wrongAnswers = 0;
    secretWord = '';
    searchedLetters = '';
}