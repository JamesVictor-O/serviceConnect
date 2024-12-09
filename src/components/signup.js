
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../firebaseConfig";
import {
  setDoc,
  doc,
} from "firebase/firestore";
import { auth } from "../firebaseConfig";
import { validateEmail } from "../index";


// sign up
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("homeAddress");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("repeat-password");
const termsCheckbox = document.getElementById("terms");
const submitButton=document.getElementById("submitBtn")

const handle_serviceSignUp = async (userData,password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "clients", user.uid), userData);
    window.location.href = "/dist/login.html";
  } catch (err) {
    alert(err.message);
  }
};
const form_validation=(e)=> {
    e.preventDefault()
  let isValid = true;

  const firstErrMsg = document.getElementById("firstnameError");
  if (!firstName.value.trim() || firstName.value.trim().length < 4) {
    firstErrMsg.innerHTML = "invalid name";
    isValid = false;
  } else {
    firstErrMsg.innerHTML = "";
    isValid = true;
  }

  const lastErrmsg = document.getElementById("lastNameError");
  if (!lastName.value.trim() || lastName.value.trim().length < 4) {
    lastErrmsg.innerHTML = "invalid last name";
    isValid = false;
  } else {
    lastErrmsg.innerHTML = "";
    isValid = true;
  }



  const emailErrMsg = document.getElementById("emailError");
  if (!email.value.trim() || !validateEmail(email.value.trim())) {
    emailErrMsg.innerHTML = "invalid email";
    isValid = false;
  } else {
    emailErrMsg.innerHTML = "";
    isValid = true;
  }

  const error = document.getElementById("homeError");
  if (!address.value.trim() || address.value.trim().length < 10) {
    error.innerHTML = "Description must be at least 10 characters long.";
  } else {
    error.innerHTML = "";
  }

  const passwordErrMsg = document.getElementById("passwordError");
  if (!password.value.trim() || password.value.trim().length < 6) {
    passwordErrMsg.innerHTML = "invalid email";
    isValid = false;
  } else {
    passwordErrMsg.innerHTML = "";
    isValid = true;
  }

  const confirmErrorMsg = document.getElementById("confirmPasswordError");
  if (confirmPassword.value.trim() !== password.value.trim()) {
    confirmErrorMsg.innerHTML = "Passwords do not match.";
    isValid = false;
  } else {
    confirmErrorMsg.innerHTML = "";
    isValid = true;
  }

  if (!termsCheckbox.checked) {
    alert("You must agree to the terms and conditions.");
    isValid = false;
  }

  return isValid;
}

if(submitButton){
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const isValid = form_validation(e);
    if (isValid) {
      const userData = {
        status:"client",
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        address: address.value,
        homeAddress:address.value,

      };
      handle_serviceSignUp(userData,password.value);
    }
  })
  
  
}