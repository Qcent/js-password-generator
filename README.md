# js-password-generator
A small web app for generating random and secure passwords based on user submitted criteria.

## Objectives
* Display a prompt to user asking for criteria of password to be generated
* Validate all input before generating a password
* Create a custom Object with properties for allowed character types that contain an array of their respective character type
* using ~~Math.random()~~ Crypto.getRandomValues() generate a password that matches the length and character requirements of user

## How to Use
1. Upon navigating to the page simply click on the "Generate Password" button... you can't miss it.
![This is what the page looks like](assets/images/app-screenshot-1.png?raw=true "Initial look of application")

2. Once clicked, you, the "User", will be asked to specify which type(s) of characters you would like included in the password to be generated. As well as the length requirement of the aforementioned password. Please note that a password length of at least 8 and no more than 128 characters is required and that at least one character type must be selected.
![This is what the page looks like later](assets/images/app-screenshot-2.png?raw=true "Look of the application in mid swing")

3. Once the password selection criteria has been established click the "Generate Password" button again. The input will be validated, and the password will be generated then displayed before you in a textarea. If you wish to use this password, simply click on the text area and through the magic of JavaScript the information will be transferred to your clipboard and off the screen, away from prying eyes.
![This is what the page could look like](assets/images/app-screenshot-3.png?raw=true "Look of the application nearing end of life")
 

## My Algorithm 
I approached the problem of generating a random password by:
1. Creating an array of characters to be allowed in the final output.
2. Randomize the index locations of all members of that array. To do this I used the Fisher-Yates Algorithm. reverse iterating through the array and swapping the index values with a randomly generated index, up to but not including the current iteration.

```javascript
    for (let i = allowedChar.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * i); 
        const temp = allowedChar[i]; 
        allowedChar.splice(i, 1, allowedChar[j]); 
        allowedChar.splice(j, 1, temp); 
    }
```

3. I then invoke crypto.getRandomValues() to generate a cryptographically secure 10 digit random string of numbers in the form of a Uint32Array, mostly because that sounds much cooler then using Math.random, and Im told it makes better random numbers then it's Math.random counterpart.

```javascript
    //generate a cryptographically secure seed 10 chars long
    var seed = new Uint32Array(1);
    window.crypto.getRandomValues(seed); 
```

4. Then I generate a random index starting position, using Math.random, up to value of 8, and take a substring of the random Uint32Array from that starting index to the proceeding index, for a random 2 digit selection.

```javascript
     const indexStart = Math.floor(Math.random() * 8);
     // indexEnd is the first index not to be included so must be 1 higher then desired index returned
     const indexEnd = indexStart + 2;
     const randIndex = parseInt(seed.toString().substring(indexStart, indexEnd));
```

5. The substring is then compared, as an integer, to the length of the allowedChar array. If it is found to be a valid index number of allowedChar, then that index number's character is added to the password to be generated. Otherwise start over from step 3.

```javascript
     if (randIndex < allowedChar.length) // if the index is valid (this will not scale past 99 possible characters)
     {
         passGen += allowedChar[randIndex]; // add an allowedChar to the passGen
     }
```

6. Steps 3-5 are repeated until the length of the generated password matched the desired length set by user and the final password is displayed.

## Conclusion
This may be an overly elaborate scheme to generate such a password but I feel that this implementation will provide truly random character selection due to the 2 factor randomization process and use of the cryptographically secure method crypto.getRandomValues()
