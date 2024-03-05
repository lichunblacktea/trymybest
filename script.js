function greetUser() {
    // Get the input value
    var userName = document.getElementById('nameInput').value;

    // Display the greeting
    displayGreeting(userName);
}

function handleKeyPress(event) {
    // Check if the pressed key is Enter (key code 13)
    if (event.keyCode === 13) {
        // Prevent the default behavior (form submission)
        event.preventDefault();

        // Trigger the greetUser function
        greetUser();
    }
}

function displayGreeting(userName) {
    // Display the greeting
    var outputElement = document.getElementById('output');
    outputElement.textContent = 'Hello ' + userName;
}

// Attach the handleKeyPress function to the keypress event of the input field
document.getElementById('nameInput').addEventListener('keypress', handleKeyPress);
