import { query,getDocs,collection} from "firebase/firestore";
import { db } from "../firebaseConfig";

export const applyGlobalFeatures = () => {
    let loginBtn=document.getElementById("loginDBtn")
    let profileIcon=document.getElementById("profieIcon")
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userInfo)

    if(userInfo){
        loginBtn.classList.add("hidden")
        profileIcon.classList.remove("hidden")
    }else{
        loginBtn.classList.remove("hidden")
        profileIcon.classList.add("hidden")
    }

    if (userInfo && userInfo.userRole === "provider") {
        dashboardLink.href = "/dist/providerDashboard.html";
      } else if (userInfo && userInfo.userRole === "client") {
        dashboardLink.href = "/dist/clienthistoryBoard.html";
      } else {
        dashboardLink.href = "/dist/login.html"; // Default route if user is not authenticated
      }

      const dropdownButton = document.getElementById("dropdownButton");
      const dropdown = document.getElementById("navbar-sticky");
    
      dropdownButton.addEventListener("click", () => {
        dropdown.classList.toggle("hidden");
      });
    
      // Optional: Close the dropdown when clicking outside of it
      document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target) && !dropdownButton.contains(e.target)) {
          dropdown.classList.add("hidden");
        }
      });

      let signOut=document.getElementById("signoutBtn");
      signOut.addEventListener("click",()=>{
        localStorage.removeItem("userInfo")
      })

      console.log(signOut)

    
  };

 export const handle_displayClientHistory= async ()=>{
    let clientHistoryContainer=document.getElementById("clientHistory")
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    


    const client_booking=query(collection(db,"bookings"))
    const querySnapshot=await getDocs(client_booking)
    let bookings=[];
    querySnapshot.forEach((booking)=>{
        if(booking.data().clientId === userInfo.userId){
            bookings.push({id:booking.id,...booking.data()})
        }
    })
    console.log(bookings)
    clientHistoryContainer.innerHTML="";
    bookings.forEach(task=>{
        clientHistoryContainer.innerHTML +=`
            <tr>
                  <td class="p-2">${task.task}</td>
                  <td class="p-2 text-green-400">${task.bookingStatus}</td>
                  <td class="p-2">23/01/2024</td>
            </tr>
        `
    })
  }
  