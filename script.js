function greetUser() {
    // Get the input value
    var userName = document.getElementById('nameInput').value;

    // Display the greeting
    var outputElement = document.getElementById('output');
    outputElement.textContent = 'Hello ' + userName;
}
