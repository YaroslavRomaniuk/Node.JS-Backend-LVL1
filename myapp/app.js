// Import the express module
const express = require('express');

// Create an instance of the express application
const app = express();

// Define the port number
const port = 3000;

// Import the fs module
let fs = require("fs");

// Write initial value '0' to the counter.txt file
fs.writeFileSync("counter.txt", "0", 'utf-8');

// Initialize the counter2 variable
let counter2 = 0;

// Define a route for the root URL
app.get('/', (req, res) => {
    
    let dataFile;
    
    // Check if the counter.txt file exists
    if (fs.existsSync("counter.txt")) {
        // Read the content of the counter.txt file
        dataFile = require("fs").readFileSync("counter.txt", "utf-8");
    }

    // Increment the value in dataFile by 1
    dataFile = parseInt(dataFile) + 1;

    // Write the updated value back to the counter.txt file
    fs.writeFileSync("counter.txt", dataFile.toString(), 'utf-8');

    // Increment the counter2 variable
    counter2++;

    // Send the response with the file value and the global counter value
    res.send("FILE: " + dataFile.toString() + " GLOBAL: " + counter2);
});

// Start the server and listen on the defined port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
