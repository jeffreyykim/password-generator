const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbols = ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?", "/"];

let passwordOne = document.getElementById("passwordOne");
let passwordTwo = document.getElementById("passwordTwo");
let passwordText1 = document.getElementById("passwordText1");
let passwordText2 = document.getElementById("passwordText2");
let passwordLength = document.getElementById("passwordLength");
let lengthValue = document.getElementById("lengthValue");
let includeSymbols = document.getElementById("includeSymbols");
let includeNumbers = document.getElementById("includeNumbers");
let copyOverlay1 = document.getElementById("copyOverlay1");
let copyOverlay2 = document.getElementById("copyOverlay2");

// Update length display when slider changes
passwordLength.addEventListener("input", function() {
    lengthValue.textContent = this.value;
});

// Add click event listeners for copying passwords
passwordOne.addEventListener("click", function() {
    copyToClipboard(passwordText1.textContent, "Password 1");
});

passwordTwo.addEventListener("click", function() {
    copyToClipboard(passwordText2.textContent, "Password 2");
});

function copyToClipboard(text, passwordName) {
    // Only copy if there's actual text and it's not empty
    if (text && text.trim() !== "") {
        navigator.clipboard.writeText(text).then(function() {
            // Show overlay with "Copied!" message
            const overlay = passwordName === "Password 1" ? copyOverlay1 : copyOverlay2;
            overlay.classList.add("show");
            
            setTimeout(() => {
                overlay.classList.remove("show");
            }, 1000);
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
        });
    }
}

function getCharacterSet() {
    let characters = [...letters]; // Always include letters
    
    if (includeNumbers.checked) {
        characters = characters.concat(numbers);
    }
    
    if (includeSymbols.checked) {
        characters = characters.concat(symbols);
    }
    
    return characters;
}

function generatePassword() {
    const length = parseInt(passwordLength.value);
    const characters = getCharacterSet();
    
    // Generate first password
    let passwordFirst = "";
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length);
        passwordFirst += characters[randomIndex];
    }
    passwordText1.textContent = passwordFirst;
    
    // Generate second password
    let passwordSecond = "";
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length);
        passwordSecond += characters[randomIndex];
    }
    passwordText2.textContent = passwordSecond;
}


