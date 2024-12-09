import {
    createUserWithEmailAndPassword,
    getAuth,
  } from "firebase/auth";
  
  import {
    setDoc,
    doc,
  } from "firebase/firestore";
  
import { auth } from "../firebaseConfig";
import { db } from "../firebaseConfig";
  
  const providerEmail = document.getElementById("providerEmail");
  const providerService = document.getElementById("providerService");
  const providerLocation = document.getElementById("providerLocation");
  const providerPhone = document.getElementById("providerPhone");
  const providerPrice = document.getElementById("providerPrice");
  const description = document.getElementById("description");
  const providerPassword = document.getElementById("providerPassword");
  const confirmPassword = document.getElementById("confirmPassword");
  const termsCheckbox = document.getElementById("termsCheckbox");
  const createAccountBtn = document.getElementById("createAccountBtn");
  
 
  const handleProviderSignUp = async (providerData,password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        providerData.providerEmail,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "provider", user.uid), providerData);
      alert("Account created successfully!");
      window.location.href = "/dist/providerDashboard.html";
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
    console.log(providerData)
  };
  
 
  const validateProviderForm = () => {
    let isValid = true;
  
    
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((error) => error.remove());
  
    
    const addError = (field, message) => {
      const errorElement = document.createElement("p");
      errorElement.className = "error-message text-red-500 text-sm mt-1";
      errorElement.textContent = message;
      field.parentElement.appendChild(errorElement);
      isValid = false;
    };
  
  
    if (!providerEmail.value.trim() || !/\S+@\S+\.\S+/.test(providerEmail.value)) {
      addError(providerEmail, "A valid email is required.");
    }
  
    if (!providerService.value.trim()) {
      addError(providerService, "Service is required.");
    }
  
    if (!providerLocation.value.trim() === "filter") {
      addError(providerLocation, "Location is required.");
    }
  
    if (!providerPhone.value.trim() || !/^\d{10,15}$/.test(providerPhone.value)) {
      addError(providerPhone, "A valid phone number is required.");
    }
  
    if (!providerPrice.value.trim()) {
      addError(providerPrice, "Price range is required.");
    }
  
    if (!description.value.trim() || description.value.trim().length < 10) {
      addError(description, "Description must be at least 10 characters long.");
    }
  
    if (!providerPassword.value.trim() || providerPassword.value.trim().length < 6) {
      addError(providerPassword, "Password must be at least 6 characters long.");
    }
  
    if (confirmPassword.value.trim() !== providerPassword.value.trim()) {
      addError(confirmPassword, "Passwords do not match.");
    }
  
    if (!termsCheckbox.checked) {
      alert("You must agree to the terms and conditions.");
      isValid = false;
    }
  
    return isValid;
  };
  

  if(createAccountBtn){
    createAccountBtn.addEventListener("click", (e) => {
      e.preventDefault();
    
      if (validateProviderForm()) {
       
        const providerData = {
          status:"serviceProvider",
          providerEmail: providerEmail.value,
          providerService: providerService.value,
          providerLocation: providerLocation.value,
          providerPhone: providerPhone.value,
          providerPrice: providerPrice.value,
          description: description.value,
        };
       
        handleProviderSignUp(providerData,providerPassword.value);
      }
    });
  }
  