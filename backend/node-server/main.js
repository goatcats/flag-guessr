const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Serve static files from the 'frontend' folder
app.use("/", express.static(path.join(__dirname, '../../frontend')));
// Serve static files from the 'login' folder on the '/login' endpoint
app.use('/login', express.static(path.join(__dirname, '../../frontend/login')));

app.use(express.json());

app.post("/logindata", (req, res) => {
    const enteredUsername = req.body.username;
    const enteredPassword = req.body.password;
    
    console.log("received login request:", req.body, "\n");

    fs.readFile('logindata.json', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({"msg":"database is corrupted"});
        }
        
        const users = JSON.parse(data);

        if (!users[enteredUsername]) {
            return res.json({ msg: "User doesn't exist" });
        }

        if (users[enteredUsername].password !== enteredPassword) {
            return res.json({ msg: "Incorrect password" });
        }

        return res.json({ msg: "valid", content: users[enteredUsername]});
    });
})

app.post("/adduserdata", (req, res) => {
    const reqUsername = req.body.username;
    const reqFullname = req.body.fullName;
    const reqEmail = req.body.email;
    const reqPassword = req.body.password;
    console.log("received adduser request:", req.body, "\n")

    const userData = JSON.parse(fs.readFileSync("logindata.json"));

    if (!userData[reqUsername]) {
        userData[reqUsername] = {
            fullName: reqFullname,
            email: reqEmail,
            password: reqPassword
        }
        fs.writeFileSync("logindata.json", JSON.stringify(userData));
        return res.json({msg: "success"});
    } else {
        return res.json({msg: "User already exists"});
    }
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
