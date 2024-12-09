import { db } from "../firebaseConfig";
import { collection,getDocs,query} from "firebase/firestore";
const serviceContainer=document.getElementById("card_holder");
export let serviceList=[]
export const get_serviceProviders= async ()=>{
    const serviceProvider= query(collection(db,"provider"))
    const querySnapshot= await getDocs(serviceProvider);
    
    querySnapshot.forEach((providers)=>{
        
        serviceList.push({id:providers.id, ...providers.data()})
    })
    if(serviceContainer){
        serviceContainer.innerHTML=""
    serviceList.map(service=>{
     
     serviceContainer.innerHTML += `
        <div
          class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-700" id=${service.id}
        >
          <a href="#">
            <img class="rounded-t-lg" src="/assets/userImage.png" alt="" />
          </a>

          <div class="p-5">
            <div class="flex gap-3 text-white my-2">
              <strong>Name: </strong> <span>${service.providerEmail}</span>
            </div>
            <div class="flex gap-3 text-white my-2">
              <strong>Service: </strong> <span>${service.providerService}</span>
            </div>
            <div class="flex gap-3 flex-col text-white my-2">
              <span
                >${service.description}</span
              >
            </div>
            <div class="flex gap-3 text-white my-2">
              <strong>Rating: </strong> <span>4.9</span>
              <img src="../assets/star.png" width="10px" height="10px" />
            </div>
            <div class="flex justify-between">
              <strong class="text-2xl text-white"> N${service.providerPrice}/hr </strong>
              <a
                href="./profile.html?userId=${service.id}"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Check profile
              </a>
            </div>
          </div>
        </div>
     `
    })
    }
    
}
document.addEventListener("DOMContentLoaded", () => {
    get_serviceProviders()



 
  });
 