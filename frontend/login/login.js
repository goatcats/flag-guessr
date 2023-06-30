async function main() {
    // Function to handle the login request
    async function login() {
        const enteredUsername = document.getElementById('username').value;
        const enteredPassword = document.getElementById('password').value;

        const requestData = {
            username: enteredUsername,
            password: enteredPassword
        };

        const response = await fetch('/logindata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        const responseData = await response.json();
        console.log(responseData);
        // Handle the server's response accordingly
        if (!responseData.content) {
            document.querySelector("#result").innerHTML = responseData.msg;
        } else {
            document.querySelector("#result").innerHTML = "";
        }
    }

    async function signup() {
        const requestData = {
            username: "goatcats",
            fullName: "Lotti Klara",
            email: "riathquish@gmail.com",
            password: "shittainer"
        }

        const response = await fetch("/adduserdata", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(requestData)
        })

        const responseData = await response.json();
        console.log(responseData);
    }

    const loginBtn = document.querySelector(".login-button")
    loginBtn.addEventListener("click", login);
};

document.addEventListener("DOMContentLoaded", async () => {
    await main();
})
