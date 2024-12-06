const form = document.getElementById("userForm");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const skill = document.getElementById("skills");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("repeat-password");
const termsCheckbox = document.getElementById("terms");
const description = document.getElementById("description");
import { handle_serviceSignUp } from "./script";

export function form_validation() {
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

  const skillErrMsg = document.getElementById("SkillError");
  if (!skill.value.trim() || skill.value.trim().length < 4) {
    skillErrMsg.innerHTML = "invalid name";
    isValid = false;
  } else {
    skillErrMsg.innerHTML = "";
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

  const error = document.getElementById("descriptionError");
  if (!description.value.trim() || description.value.trim().length < 10) {
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

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  return isValid;
}

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const isValid = form_validation();
  if (isValid) {
    const userData = {
      firstName: firstName.value,
      lastName: lastName.value,
      skill: skill.value,
      email: email.value,
      password: password.value,
      description: description.value,
    };
    handle_serviceSignUp(userData);
  }
});
