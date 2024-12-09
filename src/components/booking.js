const clientFirstName = document.getElementById("formFirstName");
const clientLastName = document.getElementById("formLastName");
const clientAddress = document.getElementById("formAddress");
const clientWork = document.getElementById("task");
const clientCheckBox = document.getElementById("bookCheckBox");
const bookNowBtn = document.getElementById("bookNow");
const params = new URLSearchParams(window.location.search);
const userId = params.get("userId");
import { db } from "../firebaseConfig";
import { setDoc,doc,addDoc,collection } from "firebase/firestore";



document.addEventListener("DOMContentLoaded", () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const clientId=userInfo.userId;

  const bookFormContainer=document.getElementById('bookForm')
 
    const handle_booking= async (userData,userId)=>{
        try{
          await addDoc(collection(db, "bookings"), userData);
            alert("successfully booked a service provider")
            bookFormContainer.classList.add("hidden")
        }catch(err){
            console.log(err)
        }
        
    }
    const form_validation = (e) => {
        let isValid = true;
      
        let firstNameErr = document.getElementById("errName");
        if (
          !clientFirstName.value.trim() ||
          clientFirstName.value.trim().length < 3
        ) {
          isValid = false;
          firstNameErr.innerHTML = "invalid firstName";
        } else {
          
          firstNameErr.innerHTML = "";
        }
      
        let lastNameErr = document.getElementById("errLast");
        if (!clientLastName.value.trim() || clientLastName.value.trim().length < 3) {
          isValid = false;
          lastNameErr.innerHTML = "invalid lastName";
        } else {
         
          lastNameErr.innerHTML = "";
        }
      
        let addressErr = document.getElementById("formAddress");
        if (!clientAddress.value.trim() || clientAddress.value.trim().length < 10) {
          isValid = false;
          addressErr.innerHTML = "address must be more than 10 character words";
        } else {
          
          addressErr.innerHTML = "";
        }
      
        let taskErr = document.getElementById("task");
        if (!clientWork.value.trim() || clientWork.value.trim().length < 10) {
          isValid = false;
          taskErr.innerHTML = "please give a clear description of task";
        } else {
         
          taskErr.innerHTML = "";
        }
      
        return isValid;
      };
      
    bookNowBtn.addEventListener("click",(e)=>{
        e.preventDefault();
        if(form_validation(e)){
            const bookingData={
                clientId:clientId,
                firstName:clientFirstName.value,
                lastName:clientLastName.value,
                providerId:userId,
                bookingStatus:"pending",
                address:clientAddress.value,
                task:clientWork.value
            }
            handle_booking(bookingData,userId)
        }
    
    })
    const cancelBtn=document.getElementById("cancelBtn")

    cancelBtn.addEventListener("click",()=>{
      bookFormContainer.classList.add('hidden');
  })
});
