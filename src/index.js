import { applyGlobalFeatures,handle_displyClientHistory } from "./components/global";
document.addEventListener("DOMContentLoaded", () => {
  applyGlobalFeatures()
  handle_displayClientHistory()
});
export const validateEmail=(email) =>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }






import "./components/providerDashboard"
import "./components/booking"
import "./components/providerDetails"
import "./components/explore"
import "./components/serviceProviderSignup"
import "./components/login"
import "./components/signup"
