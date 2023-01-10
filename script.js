var wordLength = 0;
var foundLetters = 0;
var wrongAnswers = 0;
var secretWord = '';
var searchedLetters = '';
var verifyLetter = '';
var letters = /^[a-z]+$/;

function validateWord() {
    if (document.getElementById('newSecretWord').value.match(letters)) {
        startGame();
    } else {
        resetSection('newSecretWord');
        alert('Please input lower case letters of the english alphabet');
    }
}

function validateLetter() {
    if (document.getElementById('inputLetter').value.match(letters) && document.getElementById('inputLetter').value.length == 1) {
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
   hideSection('insertWord');
   displaySection('gameSection');
   if(document.querySelector('#hideHistory').checked) {
    hideSection('wrongLettersCard');
   } else {
    displaySection('wrongLettersCard');
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
            displaySection(i);
            ++aux;
            ++foundLetters
        }
    }
    if (aux == 0 && !searchedLetters.includes(verifyLetter) && foundLetters < wordLength && wrongAnswers < 10) {
        document.getElementById('insertedLetters').innerHTML += `
            ${verifyLetter};   
        `;
        ++wrongAnswers;
        displaySection('wrong'+wrongAnswers);
    }
    verifyFinalGame();
}

function hideSection(containerID) {
    document.getElementById(containerID).style.display= "none";
}

function displaySection(containerID) {
    document.getElementById(containerID).style.display= "";
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
        displaySection('resultCard');
    } else if (wrongAnswers == 10) {
        document.getElementById('resultText').innerHTML = `
You Lose &#128542
<br>
Be optimistic and try again!
`;
        displaySection('resultCard');
    }
}

function restartGame() {
    resetSection('wordTable');
    resetSection('resultText');
    hideSection('resultCard');
    resetSection('inputLetter');
    document.getElementById('insertedLetters').innerHTML =``;
    for (let i = 1; i <= 10; ++i) {
        hideSection('wrong'+i);
    }
    hideSection('gameSection');
    resetSection('newSecretWord');
    document.getElementById('hideHistory').checked = false;
    displaySection('insertWord');
    wordLength = 0;
    foundLetters = 0;
    wrongAnswers = 0;
    secretWord = '';
    searchedLetters = '';
}