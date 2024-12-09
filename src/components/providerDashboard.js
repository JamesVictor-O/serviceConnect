import { db } from "../firebaseConfig";
import { collection, getDocs, query,doc,updateDoc ,serverTimestamp} from "firebase/firestore";



document.addEventListener("DOMContentLoaded",()=>{

    const respond_toBooking=async(providerId,response)=>{
        const bookingRef=doc(db,"bookings",providerId)
        await updateDoc(bookingRef,{
            bookingStatus:response,
            time:serverTimestamp()
        })

        alert("respond successfully sent")
    
    }



    let tableContainer=document.getElementById("bookingTable");
    const get_clientRequest= async()=>{
        const client_booking=query(collection(db,"bookings"))
        const querySnapshot=await getDocs(client_booking)
        let bookings=[];
        querySnapshot.forEach((booking)=>{
            if(booking.data().bookingStatus === "pending"){
                bookings.push({id:booking.id,...booking.data()})
            }
        
        })
       tableContainer.innerHTML=""
       bookings.forEach(bookings=>{
           tableContainer.innerHTML += `
             <tr class="bg-white border-b text-black dark:border-gray-700" id=${bookings.id}>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  ${bookings.firstName} ${bookings.lastName}
                </th >
                <td class="px-6 py-4">Plumbering</td>
                <td class="px-6 py-4">${bookings.address}</td>
                <td class="px-6 py-4">
                  <button
                    type="button"
                    class="acceptBtn text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    class="declinBtn text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    Decline
                  </button>
                </td>
              </tr>
           `
       })

    document.querySelectorAll(".declinBtn").forEach(button=>{
        button.addEventListener("click",(button)=>{
            let providerId= button.target.parentElement.parentElement.id;
            respond_toBooking(providerId,"Decline")
          })
    })
    document.querySelectorAll(".acceptBtn").forEach(button=>{
        button.addEventListener("click",(button)=>{
            let providerId= button.target.parentElement.parentElement.id;
            respond_toBooking(providerId,"Accept")
          })
    })
    }
    get_clientRequest()

})