const backendURL = "http://localhost:5001";

// Handle Google Login Response
function handleGoogleLogin(response) {
    axios.post(`${backendURL}/google-login`, { token: response.credential })
        .then(res => {
            alert(res.data.message);
            localStorage.setItem("userId", res.data.userId);
            window.location.href = "home.html"; // Redirect after login
        })
        .catch(error => {
            alert(error.response?.data?.message || "Google Login failed");
        });
}



// Login Function (Add this if missing)
const handleLogin = async (email, password) => {
    try {
        const response = await axios.post(`${backendURL}/login`, { email, password });
        alert(response.data.message);
        localStorage.setItem("userId", response.data.userId);
        window.location.href = "home.html"; // Redirect after successful login
    } catch (error) {
        alert(error.response?.data?.message || "Login failed");
    }
};

// Toggle Login/Signup Forms
function toggleForms() {
    document.getElementById("login-box").style.display =
        document.getElementById("login-box").style.display === "none" ? "block" : "none";
    document.getElementById("signup-box").style.display =
        document.getElementById("signup-box").style.display === "none" ? "block" : "none";
}

// Login Form Event
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    handleLogin(email, password);
});
//signupform
document.getElementById("signup-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("signup-confirm-password").value;
    handleSignup(email, password, confirmPassword);
});
const handleSignup = async (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }
    try {
        const response = await axios.post(`${backendURL}/signup`, { email, password });
        alert(response.data.message);
        window.location.href = "home.html";
    } catch (error) {
        alert(error.response?.data?.message || "Signup failed");
    }
};