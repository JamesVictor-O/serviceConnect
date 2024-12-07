// Import the functions you need from the SDKs you need


// sign up function for client
const handle_clientSignUp= async ()=>{
    const providerData={
        clientIdId,
        location,
        firstname,
        lastname,

    }
    try{

        const userCredential=createUserWithEmailAndPassword(auth,email,password)
        const user=(await userCredential).user

        await setDoc(doc(db,"provider",user.uid),userData)
    }catch(err){
        console.log(err)
    }
}


// sign up function for client
export const handle_serviceSignUp= async (userData)=>{  
    try{
        const userCredential=createUserWithEmailAndPassword(auth,userData.email,userData.password)
        const user=(await userCredential).user

        await setDoc(doc(db,"clients",user.uid),userData)
        alert("okay")
    }catch(err){
        console.log(err)
    }
}

//setting up booking section 
const handle_booking= async ()=>{
    const bookingData={
        clientId,
        providerId,
        bookingStatus,
    }
    try{
        await setDoc(doc(db,"clients",user.uid),userData)
    }catch(err){
        console.log(err)
    }
}




// login function
const handle_login=async()=>{
    try{
        const userCredential=signInWithEmailAndPassword(auth,email,password);
        const user=(await userCredential).user
    }catch(err){
        console.log(err)
    }
    
}

// feaching list of service providers

const get_serviceProviders=()=>{
    const serviceProvider=query(collection(db,"provider"))
    const querySnapshot= getDocs(serviceProvider);

    querySnapshot.forEach(items => {
        
    })
}


// function for provider interacting with booking;
const respond_toBooking=async(providerId,response)=>{
    const bookingRef=doc(db,"bookings",providerId)
    
    await updateDoc(bookingRef,{
        status:response
    })

}