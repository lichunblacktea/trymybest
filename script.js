function submitData() {
    // Get the input values
    var username = document.getElementById('usernameInput').value;
    var password = document.getElementById('passwordInput').value;
    var comment = document.getElementById('commentInput').value;

    // Check if any field is empty
    if (!username || !password || !comment) {
        alert("Please fill in all fields before submitting.");
        return;
    }

    // Construct the data object (replace with your Google Sheets API endpoint)
    var data = {
        username: username,
        password: password,
        comment: comment
    };

    // Simulate sending data to Google Sheets (replace with actual API call)
    console.log("Data to be sent to Google Sheets:", data);

    fetch('https://script.google.com/macros/s/AKfycbyaKcfvEfVRWA5C1fmmgRdZrVVaneGgEN8hqti_csimTXCB9AGubvGiBlCysFy-zxJFzw/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: 'John Doe',
            email: 'john.doe@example.com',
            message: 'Hello, this is a test message!'
        }),
    })
        
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });



    // Update the Google Sheets iframe with the published sheet link
    var googleSheetIframe = document.getElementById('googleSheet');
    googleSheetIframe.src = 'https://docs.google.com/spreadsheets/d/1yIQXMRGSomKZ-Kn1Te3G4TS4_Gy-sxHJbvIcn24U3yQ/edit?usp=sharing';
}
