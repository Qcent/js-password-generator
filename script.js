// Assignment Code
var generateBtn = document.querySelector("#generate");
var validateBtn = document.querySelector("#validateInput");


// Function to Validate user Input
var validateInput = function() {
    // disable the validate button
    validateBtn.disabled = true;


    // create a ctiteria object
    var passwordCriteria = {
        length: '8-128',
        characters: 'uppper, lower, numeric, special',
        validate: 'all input valid, at least one character type selected',
    };

    // retrieve user input
    passwordCriteria.length = document.querySelector("#numOfChars").value;
    // check all the checkboxes
    var checkboxes = document.getElementsByTagName("input");
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == "checkbox") {
            if (checkboxes[i].checked) { passwordCriteria[checkboxes[i].name] = true }
        }
    }

    console.log(passwordCriteria);
    // validate input
    //
}

// Function to Generate a Password
var generatePassword = function() {

    // disable the generate button
    generateBtn.disabled = true;
    // display criteria prompt with submit button
    document.getElementById("passwordOverlay").style.opacity = 1;

    // Add event listener to validate button
    // and wait for user to click then send to validateInput function
    validateBtn.addEventListener("click", validateInput);

    // generate password according to criteria

    //return password

}


// Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);