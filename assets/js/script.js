// Assignment Code
var generateBtn = document.querySelector("#generate");
var alertCopy = document.querySelector(".card-header h2");
var passwordText = document.querySelector("#password");

var defaultError = "PLEASE CHOOSE A VALID INPUT!!!\n";
var passwordCriteria = {};

const charaterTypes = {
    upper: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K",
        "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
    ],
    lower: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
        "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ],
    number: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    special: [" ", "!", "#", "$", "%", "&", "'", "(", ")", "*", "+", " ,",
        "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\",
        "]", "^", "_", "`", "{", "|", "}", "~"
    ]
}

// Function to prompt for length
var promptForLength = function() {
    // display criteria prompt

    passwordCriteria.length = window.prompt('How Long of a password? (8-128)')
        // validation for length
    if (passwordCriteria.length > 128 || passwordCriteria.length < 8) {
        alert('Invalid Password Length! Read the instructions better.');
        return promptForLength();
    }
}

// Function to prompt for Uppercase
var promptForUpper = function(errorMessage) {
    // display criteria prompt

    passwordCriteria.uppercase = window.prompt('Would you like the password to contain UPPERCASE charatcers? \n 1 - YES \n 2 - NO', 'yes');

    switch (passwordCriteria.uppercase.toUpperCase()) {
        case "YES":
        case "1":
            passwordCriteria.uppercase = 'YES';
            return 1
        case "NO":
        case "2":
            return 0;
        default:
            return promptForUpper(defaultError);
    }
}

// Function to prompt for Lowercase
var promptForLower = function(errorMessage) {
    // display criteria prompt

    passwordCriteria.lowercase = window.prompt('Would you like the password to contain LOWERCASE charatcers? \n 1 - YES \n 2 - NO', 'yes');

    switch (passwordCriteria.lowercase.toUpperCase()) {
        case "YES":
        case "1":
            passwordCriteria.lowercase = 'YES';
            return 1
        case "NO":
        case "2":
            return 0;
        default:
            return promptForLower(defaultError);
    }
}

// Function to prompt for Numeric
var promptForNumeric = function(errorMessage) {
    // display criteria prompt

    passwordCriteria.numeric = window.prompt('Would you like the password to contain NUMERIC charatcers? \n 1 - YES \n 2 - NO', 'yes');

    switch (passwordCriteria.numeric.toUpperCase()) {
        case "YES":
        case "1":
            passwordCriteria.numeric = 'YES';
            return 1
        case "NO":
        case "2":
            return 0;
        default:
            return promptForNumeric(defaultError);
    }
}

// Function to prompt for Special
var promptForSpecial = function(errorMessage) {
    // display criteria prompt

    passwordCriteria.special = window.prompt('Would you like the password to contain SPECIAL charatcers? \n 1 - YES \n 2 - NO', 'yes');

    switch (passwordCriteria.special.toUpperCase()) {
        case "YES":
        case "1":
            passwordCriteria.special = 'YES';
            return 1
        case "NO":
        case "2":
            return 0;
        default:
            return promptForSpecial(defaultError);
    }
}

// Function to collect user Input
var collectCriteria = function() {

    promptForLength();
    let charTypeCount = 0;
    while (charTypeCount < 1) {
        charTypeCount += promptForUpper();
        charTypeCount += promptForLower();
        charTypeCount += promptForNumeric();
        charTypeCount += promptForSpecial();

        if (charTypeCount === 0) { alert("You need to pick at least one charater type") }
    }

    generatePassword(passwordCriteria.length, passwordCriteria.uppercase, passwordCriteria.lowercase, passwordCriteria.numeric, passwordCriteria.special);
}

// Function to Generate a Password
var generatePassword = function(len, upp, low, num, spc) {
    // generate password according to criteria
    //make a list of valid charaters
    var allowedChar = new Array();

    if (upp === 'YES') { allowedChar = allowedChar.concat(charaterTypes.upper); }
    if (low === 'YES') { allowedChar = allowedChar.concat(charaterTypes.lower); }
    if (num === 'YES') { allowedChar = allowedChar.concat(charaterTypes.number); }
    if (spc === 'YES') { allowedChar = allowedChar.concat(charaterTypes.special); }

    for (let i = allowedChar.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = allowedChar[i];
        //allowedChar[i] = allowedChar[j];  //splice is needed
        allowedChar.splice(i, 1, allowedChar[j]);
        //allowedChar[j] = temp;  //splice is needed
        allowedChar.splice(j, 1, temp);
    }

    // variable to store password as it is generated
    let passGen = '';
    while (passGen.length < len) { // while less then the required number of characters loop

        var seed = new Uint32Array(1);
        window.crypto.getRandomValues(seed); //generate a cryptographically secure seed 10 chars long

        //there are only 93 possible characters to choose from so
        //take 2 consecutive digits from seed convert to int and use as index to allowedChar
        const indexStart = Math.floor(Math.random() * 8);
        // indexEnd is the first index not to included so must be 1 higher then desired index
        const indexEnd = indexStart + 2;
        const randIndex = parseInt(seed.toString().substring(indexStart, indexEnd));

        if (randIndex < allowedChar.length) // if the index is valid (this will not scale past 99 possible characters)
        {
            passGen += allowedChar[randIndex]; // add an allowedChar to the passGen
        }
    }

    //display password
    //console.log(passGen);
    passwordText.value = passGen;


    //alert user copy is ready
    alertCopy.className += " alertCopy";
    if (window.screen.width < 360) { /* if small screen the full text does not look good */
        alertCopy.innerHTML = "Click to copy";
    } else {
        alertCopy.innerHTML = "Click password to copy";
    }
}

function copyToClipboard() {
    // write pasword to clipboard
    navigator.clipboard.writeText(document.querySelector("#password").value);
    document.querySelector("#password").value = "Copied to Clipboard";
    // reset textarea to default state after setTimeout
    setTimeout(function() {
        resetPasswordTextArea();
    }, 1200);
    // reset copy alert
    alertCopy.innerHTML = "Generate a Password";
}

function resetPasswordTextArea() {
    document.querySelector("#password").value = null;
}

// Add event listener to generate button
generateBtn.addEventListener("click", collectCriteria);

// Execute a function when the user presses "Enter on the keyboard
inputEntered.addEventListener("keyup", function(event) {
    //  13 is the keyCode for "Enter" 
    if (event.keyCode === 13) {
        // prevent the default action
        event.preventDefault();
        // Trigger the button click
        generateBtn.click();
    }
});