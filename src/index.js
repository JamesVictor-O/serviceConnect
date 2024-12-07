




export const validateEmail=(email) =>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }





import "./components/providerDetails"
import "./components/explore"
import "./components/serviceProviderSignup"
import "./components/login"
import "./components/signup"
