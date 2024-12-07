import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

// Select DOM elements
const userEmail = document.getElementById("LoginEmail");
const userPassword = document.getElementById("password");
const loginButton = document.getElementById("loginBtn");

// Email validation function
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Login validation
function login_validation(e) {
  e.preventDefault();
  let isValid = true;

  const errMsg = document.getElementById("emailError");
  if (!userEmail.value.trim() || !validateEmail(userEmail.value.trim())) {
    errMsg.innerHTML = "Invalid email address";
    isValid = false;
  } else {
    errMsg.innerHTML = "";
  }

  const passwordMsg = document.getElementById("passwordError");
  if (!userPassword.value.trim() || userPassword.value.trim().length < 5) {
    passwordMsg.innerHTML = "Invalid password";
    isValid = false;
  } else {
    passwordMsg.innerHTML = "";
  }

  return isValid;
}

// Handle login
const handle_login = async (userInfo) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password);
    const user = userCredential.user; 
    console.log("Login successful:", user);
    window.location.href = "/dist/explorerSection.html";
  } catch (err) {
    console.error("Login failed:", err.message);
    const errMsg = document.getElementById("emailError");
    errMsg.innerHTML = "Login failed. Please check your credentials.";
  }
};

// Attach event listener to the login button
if (loginButton) {
  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const isValid = login_validation(e);

    if (isValid) {
      const userInfo = {
        email: userEmail.value,
        password: userPassword.value,
      };
      handle_login(userInfo);
    }
  });
}
