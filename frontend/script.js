async function registerUser(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const newUser = {
        name,
        email,
        password
    };

    try {
        const response = await fetch('/api/expense-tracker/v1/users/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        });

        if (!response.ok) {
            throw new Error('Failed to register user');
        }

        const responseData = await response.json();
        alert(responseData.message);
    } catch(error) {
        console.error('Error registering user:', error);
        alert('Failed to register user. Please try again.');
    }
}

async function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userSigninData = {
        email,
        password
    };

    try {
        const response = await fetch('/api/expense-tracker/v1/users/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userSigninData)
        });

        if (!response.ok) {
            throw new Error('Failed to login user');
        }

        const responseData = await response.json();
        localStorage.setItem('token', responseData.token);
        alert(responseData.message);
        window.location.href = 'https://your-expense-tracker-app.com/home.html'; // Replace with your actual URL
    } catch(error) {
        console.error('Error logging in user:', error);
        alert('Failed to login user. Please try again.');
    }
}
