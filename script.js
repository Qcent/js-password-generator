// Assignment Code
var generateBtn = document.querySelector("#generate");
var validateBtn = document.querySelector("#validateInput");

const charaterTypes = {
    upper: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K",
        "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
    ],
    lower: ["a", "b", "c", "d", "e", "f", "g", "h", "i'", "j", "k",
        "l", "m", "n", "o", "p", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ],
    num: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    special: ["!", "#", "$", "%", "&", "'", "(", ")", "*", "+", " ,",
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

// Function to Generate a Password
var displayCriteria = function() {

    // disable the generate button
    generateBtn.disabled = true;
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
    for (let i = 0; i < len; i++) {

    }
    //return password
}


// Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", displayCriteria);