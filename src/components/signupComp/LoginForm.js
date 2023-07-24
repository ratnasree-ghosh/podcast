import React, {useState} from 'react';
import InputComponenet from '../commonComp/Input/index';
import Button from "../commonComp/Button/index";
import {signInWithEmailAndPassword} from "firebase/auth";
import {doc,getDoc} from "firebase/firestore";
import {auth,db} from "../../firebase";
import {setUser} from "../../slices/userSlice";
import { useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function LoginForm() {
   
  const [email, setEmail] = useState("");
  const [pass,setPass] = useState("");
  const [loading, setLoading] = useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async() => {
    console.log("Login clicked!");

    if(pass && email){
      try{

        setLoading(true);
        //creating user account-----
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          pass
        );
  
        const user = userCredential.user;
  
        const userDoc = await getDoc(doc(db, "Users", user.uid));
        // console.log(userDoc);
        const userData = userDoc.data();
        console.log("created user", userData);
          
        
  
      //   //saving user's data to redux----------------
          dispatch(setUser({
            name: userData.name,
            email: user.email,
            uid: user.uid
        }));
  
        setLoading(false);
        toast.success("Login Successfull!")
        navigate("/profile");
  
      }catch(e){
        
        toast.error(e.message);
        setLoading(false);
      }
    }else{
      if(email==="" && pass===""){
        toast.error("Please Enter Email & Password!")
      }
      else if(email===""){
        toast.error("Please Enter Email!")
      }else if(pass===""){
        toast.error("Please Enter Password!")
      }
      setLoading(false);
    }
    

  }
  return (
    <div>
        

      <InputComponenet
        type="email"
        placeholder="Email"
        required="true"
        setState={setEmail}
        state={email}
      />

      <InputComponenet
        type="text"
        placeholder="Password"
        setState={setPass}
        state={pass}
      />

      

      <Button btnName={loading? "Loading...": "Login"} onClick={handleClick} disabled={loading}/>
    </div>
  )
}

export default LoginForm;