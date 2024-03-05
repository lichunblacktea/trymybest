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

    // You would typically make an API call to send data to Google Sheets here
    // Example: Use fetch or other AJAX methods to send data to your server or Google Sheets API endpoint
    // Replace the following line with the actual API call:
    // fetch('YOUR_GOOGLE_SHEETS_API_ENDPOINT', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    // })
    // .then(response => response.json())
    // .then(result => {
    //     console.log('Success:', result);
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    // });

    // Update the Google Sheets iframe with the published sheet link
    var googleSheetIframe = document.getElementById('googleSheet');
    googleSheetIframe.src = 'https://docs.google.com/spreadsheets/d/1yIQXMRGSomKZ-Kn1Te3G4TS4_Gy-sxHJbvIcn24U3yQ/edit?usp=sharing';
}
