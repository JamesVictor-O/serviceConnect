import { auth,db } from "../firebaseConfig";
import { signInWithEmailAndPassword} from "firebase/auth";
import { getDoc,doc } from "firebase/firestore";


const userEmail = document.getElementById("LoginEmail");
const userPassword = document.getElementById("password");
const loginButton = document.getElementById("loginBtn");
import { get_serviceProviders } from "./explore";

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}


function login_validation(e) {
  e.preventDefault();
  let isValid = true;

  const errMsg = document.getElementById("emailError");
  if (!userEmail.value.trim() || !validateEmail(userEmail.value.trim())) {
    errMsg.innerHTML = "Invalid email address";
    isValid = false;
  } else {
    errMsg.innerHTML = "";
  }

  const passwordMsg = document.getElementById("passwordError");
  if (!userPassword.value.trim() || userPassword.value.trim().length < 5) {
    passwordMsg.innerHTML = "Invalid password";
    isValid = false;
  } else {
    passwordMsg.innerHTML = "";
  }

  return isValid;
}

const handle_login = async (userInfo) => {

  try {
    const userCredential = await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password);
    const user = userCredential.user; 
    
    let userId=user.uid;
    let clientDocRef= await getDoc(doc(db, "clients",userId))
    console.log("Client Doc:", clientDocRef.data());
    if(clientDocRef.exists()){
      let userInfo={
          userRole:"client",
          userId,
      }
      alert("he is a client")
      localStorage.setItem("userInfo",JSON.stringify(userInfo))
      window.location.href = "/dist/explorerSection.html";
    }else{
        const providerDocRef =await getDoc(doc(db, "provider", userId));
        
        if(providerDocRef.exists()){
          let userInfo={
            userRole:"provider",
            userId
          }
          alert("he is a service provider")
          localStorage.setItem("userInfo",JSON.stringify(userInfo))
          window.location.href = "/dist/providerDashboard.html";
        }
            
    }


   

  } catch (err) {
    console.error("Login failed:", err.message);
    const errMsg = document.getElementById("emailError");
    errMsg.innerHTML = "Login failed. Please check your credentials.";
  }
};


if (loginButton) {
  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const isValid = login_validation(e);

    if (isValid) {
      const userInfo = {
        email: userEmail.value,
        password: userPassword.value,
      };
      handle_login(userInfo);
    }
  });
}
