import React, {useState} from 'react';
import InputComponenet from '../commonComp/Input/index';
import Button from "../commonComp/Button/index";
import {auth,db} from "../../firebase";
import {createUserWithEmailAndPassword} from "firebase/auth"
import {setDoc,doc} from "firebase/firestore";
import { useDispatch } from 'react-redux';
import {setUser} from "../../slices/userSlice";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass,setPass] = useState("");
  const [conPass, setConPass] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

   const handleClick = async()=> {
    console.log("signup clicked!");
    

    if(pass===conPass && pass.length>=6 && name!== "" && email!==""){
      try{

        setLoading(true);
        //creating user account-----
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          pass
        );

        const user = userCredential.user;
        console.log("created user", user);
          
        // saving user's data to firebase database-------
        await setDoc(doc(db, "Users", user.uid), {
            name: name,
            email: user.email,
            uid: user.uid
        });

      //   //saving user's data to redux----------------
          dispatch(setUser({
            name: name,
            email: user.email,
            uid: user.uid
        }));

        setLoading(false);
        toast.success("Signup Successfull!")
        navigate("/profile");

      }catch(e){
        toast.error(e.message);
        setLoading(false);
      }
    }else{
      if(pass!== conPass){
        toast.error("Password Mismatched!")
      }else if(pass.length < 6){
        toast.error("Password should be more than 6!")
      }else if(name===""){
        toast.error("Name Shouldn't be empty!")
      }else if(email===""){
        toast.error("Email Shouldn't be empty!")
      }
      setLoading(false);
    }
  }
  return (
    <div>
        <InputComponenet
        type="text"
        placeholder="Full Name"
        required="true"
        setState={setName}
        state={name}
      />

      <InputComponenet
        type="email"
        placeholder="Email"
        required="true"
        setState={setEmail}
        state={email}
      />

      <InputComponenet
        type="password"
        placeholder="Password"
        setState={setPass}
        state={pass}
      />

      <InputComponenet
        type="password"
        placeholder="Confirm Password"
        required="true"
        setState={setConPass}
        state={conPass}
      />

      <Button btnName={loading? "Loading...": "Sign Up"} onClick={handleClick} disabled={loading}/>
    </div>
  )
}

export default SignUpForm;