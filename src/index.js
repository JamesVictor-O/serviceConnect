




export const validateEmail=(email) =>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }








import "./components/login"
import "./components/signup"
