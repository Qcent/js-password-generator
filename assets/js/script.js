// Assignment Code
var generateBtn = document.querySelector("#generate");
var validateBtn = document.querySelector("#validateInput");
var copyBtn = document.querySelector("#copyPassword");
var passwordText = document.querySelector("#password");

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

// Function to Validate user Input
var validateInput = function() {
    // disable the validate button
    validateBtn.disabled = true;

    // create a ctiteria object to store all criteria info
    var passwordCriteria = {
        charLength: '8-128',
        //only one property is defined
        //later if there is more then 1 defined
        //we will know the user has selected at least one charater type
        /* Object.keys(passwordCriteria).length */
    };

    // retrieve user input
    // parse the input as an int
    passwordCriteria.charLength = parseInt(document.querySelector("#numOfChars").value);

    var checkboxes = document.getElementsByTagName("input");
    // check all the checkboxes to see if they are checked
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == "checkbox") {
            // if box is checked define a new property of checkbox.name and set it true
            if (checkboxes[i].checked) { passwordCriteria[checkboxes[i].name] = true }
        }
    }
    //   */

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
        // re-enable the validate button
        validateBtn.disabled = false;
    } else {
        //   */
        generatePassword(passwordCriteria.charLength, passwordCriteria.Upper, passwordCriteria.Lower, passwordCriteria.Num, passwordCriteria.Special);
    }

}

// Function to Display teh Criteria selector
var displayCriteria = function() {

    // disable the generate button
    generateBtn.disabled = true;

    // enable the validate button
    validateBtn.disabled = false;

    // display criteria prompt with submit button
    document.getElementById("passwordOverlay").style.opacity = 1;

    // Add event listener to validate button
    // and wait for user to click then send to validateInput function
    validateBtn.addEventListener("click", validateInput);
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
    // i will attempt to explain it
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
        const randIndex = parseInt(seed.toString().substr(Math.floor(Math.random() * 7) + 1, 2));

        console.log(randIndex + ":" + allowedChar[randIndex])

        if (randIndex < allowedChar.length - 1) // if the index is valid (this will not scale past 99 possible characters)
        {
            passGen += allowedChar[randIndex]; // add an allowedChar to the passGen
        }
    }


    //display password
    console.log(passGen);
    var passwordText = document.querySelector("#password");
    passwordText.value = passGen;


    // disable the validate button
    validateBtn.disabled = true;
    // enable the generate button
    generateBtn.disabled = false;
    //hide the overlay
    document.getElementById("passwordOverlay").style.opacity = 0;

    //display copy button
    document.getElementById("copyPassword").style.display = "show";
}

// Write password to the #password input
// not used in my implimentation
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;
}

function copyToClipboard() {
    // write pasword to clipboard
    navigator.clipboard.writeText(document.querySelector("#password").value);
    document.querySelector("#password").value = "Copied to Clipboard";

    setTimeout(function() {
        resetPasswordTextArea();
    }, 1200);

}

function resetPasswordTextArea() {
    document.querySelector("#password").value = null;
}
// Add event listener to generate button
generateBtn.addEventListener("click", displayCriteria);

// Add event listener to copy button
copyBtn.addEventListener("click", copyToClipboard);