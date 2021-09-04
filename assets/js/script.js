// Assignment Code
var generateBtn = document.querySelector("#generate");
var inputEntered = document.querySelector("#charLength");
var alertCopy = document.querySelector(".card-header h2");
var passwordText = document.querySelector("#password");
var passwordOverlay = document.getElementById("passwordOverlay");

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

//Function to decide what #generate button does
var displayOrCreate = function() {
    if (passwordOverlay.style.zIndex > 0) {
        validateInput();
    } else {
        displayCriteria();
    }
}

// Function to Display the Criteria selector
var displayCriteria = function() {
    // display criteria prompt with submit button
    passwordOverlay.style.zIndex = 1;
}

// Function to Validate user Input
var validateInput = function() {
    // create a ctiteria object to store all criteria info
    var passwordCriteria = {
        charLength: '8-128',
    };
    //only one property is defined
    //later if there is more then 1 defined
    //we will know the user has selected at least one charater type
    /* Object.keys(passwordCriteria).length */


    // retrieve user input
    // parse the input as an int
    passwordCriteria.charLength = parseInt(document.querySelector("#charLength").value);

    var checkboxes = document.getElementsByTagName("input");
    // check all the checkboxes to see if they are checked
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == "checkbox") {
            // if box is checked define a new property of checkbox.name and set it true
            if (checkboxes[i].checked) { passwordCriteria[checkboxes[i].name] = true }
        }
    }
    /****/

    // validate input
    let validInput = true;

    if (Object.keys(passwordCriteria).length < 2) {
        // no character options were sellected
        validInput = false;
    }
    if (!Number.isInteger(passwordCriteria.charLength) || passwordCriteria.charLength < 8 || passwordCriteria.charLength > 128) {
        // not an integer or not within valid range of 8 to 128
        validInput = false;
    }

    if (!validInput) {
        window.alert("Invalid Input \n\nPlease enter a password length between 8 and 128 characters and select at least one type of character to be used");

    } else {
        generatePassword(passwordCriteria.charLength, passwordCriteria.Upper, passwordCriteria.Lower, passwordCriteria.Num, passwordCriteria.Special);
    }

}

// Function to Generate a Password
var generatePassword = function(len, upp, low, num, spc) {
    // generate password according to criteria
    //make a list of valid charaters
    var allowedChar = new Array();

    if (upp) { allowedChar = allowedChar.concat(charaterTypes.upper); }
    if (low) { allowedChar = allowedChar.concat(charaterTypes.lower); }
    if (num) { allowedChar = allowedChar.concat(charaterTypes.number); }
    if (spc) { allowedChar = allowedChar.concat(charaterTypes.special); }

    //random sort the array to mix up character types
    //found this touted as the most efficient algorithm online 
    // a random swap using the Fisher-Yates Algorithm
    // I will attempt to explain it
    /* for (let i = array.length— 1; i > 0; i--) {      // let i = array length ; while i > 0 run the loop; count down i each loop
        const j = Math.floor(Math.random() * i)         // let j = a random number up to value of i
        const temp = array[i]                        // have a temp array hold value at array[i]
        array[i] = array[j]                         // change array[i] value to the random(j) chosen position array[j]
        array[j] = temp                             // change array[j] value to the original value of the array[i]
    } // continue counting through array until every element has been swaped out for another by brute force
    */

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

    //hide the overlay
    passwordOverlay.style.zIndex = -1;

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
generateBtn.addEventListener("click", displayOrCreate);

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