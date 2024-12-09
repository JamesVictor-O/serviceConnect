import { db } from "../firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";


const bookFormContainer=document.getElementById('bookForm')

const params = new URLSearchParams(window.location.search);
const userId = params.get("userId");


document.addEventListener("DOMContentLoaded", () => {
    let detailContainer = document.getElementById("detailContainer");
  const getServiceProvider = async () => {
    const serviceProvider = query(collection(db, "provider"));
    const querySnapshot = await getDocs(serviceProvider);
    let serviceList = [];
    querySnapshot.forEach((providers) => {
      serviceList.push({ id: providers.id, ...providers.data() });
    });
    if (detailContainer) {
      let profileToDisplay =[]
       profileToDisplay.push(serviceList.find((service) => service.id == userId))

      profileToDisplay.map((service) => {
        detailContainer.innerHTML = `
                  <div class="flex flex-col lg:flex-row gap-6 p-6 lg:px-10">
        <!-- Sidebar -->
        <div class="lg:w-1/4 h-full bg-white rounded-md shadow-md p-6">
          <!-- Profile Section -->
          <div class="flex flex-col items-center">
            <div class="w-32 h-32 mb-4 overflow-hidden rounded-full">
              <img src="/assets/Ellipse 1.png" alt="Profile" class="w-full h-full object-cover" />
            </div>
            <h2 class="font-semibold text-xl text-center mb-2">${service.providerEmail}</h2>
            <div class="text-center mb-4">
              <span class="font-medium">Rating: </span>
              <span class="text-yellow-500 font-bold">4.9</span>
            </div>
            <button
            id="bookFormBtn"
             class="bg-black text-white py-2 px-4 rounded-md w-full hover:bg-gray-800 transition">
              book
            </button>
            <h3 class="mt-4 text-lg">
              Jobs Completed: <span class="font-bold">1022</span>
            </h3>
          </div>
        </div>
    
        <!-- Main Content -->
        <div class="lg:w-3/4">
            <div class="bg-white rounded-md shadow-md p-6">
            <h2 class="text-xl font-semibold mb-4">Reviews</h2>
            
            <div class="border-b pb-4 mb-4">
              <div class="flex items-center gap-4">
                <img src="/assets/Ellipse 1.png" alt="Reviewer" class="w-16 h-16 rounded-full object-cover" />
                <div>
                  <span class="font-semibold">${service.providerEmail}</span>
                  <div class="flex mt-1 text-yellow-500">
                    <img src="/assets/star.png" alt="Star" class="w-4 h-4" />
                    <img src="/assets/star.png" alt="Star" class="w-4 h-4" />
                    <img src="/assets/star.png" alt="Star" class="w-4 h-4" />
                    <img src="/assets/star.png" alt="Star" class="w-4 h-4" />
                    <img src="/assets/star.png" alt="Star" class="w-4 h-4" />
                  </div>
                </div>
              </div>
              <p class="mt-3 text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam dolore voluptatum
                assumenda.
              </p>
            </div> 
    
          
            <div class="border-b pb-4 mb-4">
              <div class="flex items-center gap-4">
                <img src="/assets/Ellipse 1.png" alt="Reviewer" class="w-16 h-16 rounded-full object-cover" />
                <div>
                  <span class="font-semibold">Jane Amarachi Amos</span>
                  <div class="flex mt-1 text-yellow-500">
                    <img src="/assets/star.png" alt="Star" class="w-4 h-4" />
                    <img src="/assets/star.png" alt="Star" class="w-4 h-4" />
                    <img src="/assets/star.png" alt="Star" class="w-4 h-4" />
                    <img src="/assets/star.png" alt="Star" class="w-4 h-4" />
                    <img src="/assets/star.png" alt="Star" class="w-4 h-4" />
                  </div>
                </div>
              </div>
              <p class="mt-3 text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam dolore voluptatum
                assumenda.
              </p>
            </div>
          </div>
          
          <div class="bg-white rounded-md shadow-md mt-6 p-6">
            <h2 class="text-xl font-semibold mb-4">About</h2>
            <p class="text-gray-700 leading-relaxed">
             ${service.description}
            </p>
          </div>
        </div>
      </div>




      
            `;
      });
    }
    const bookformBtn=document.getElementById("bookFormBtn")

    bookformBtn.addEventListener("click",()=>{
      bookFormContainer.classList.remove('hidden');
  })

  };

  getServiceProvider()
 
});
