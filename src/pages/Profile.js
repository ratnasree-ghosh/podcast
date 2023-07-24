import React from 'react';
import Header from '../components/commonComp/Header/index';
import { useSelector } from 'react-redux';
import Button from '../components/commonComp/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import {toast} from "react-toastify";
import Loader from "../components/commonComp/Loader/index";

 const Profile = () => {
  const user = useSelector((state)=> state.user.user);
  console.log(user);

  const handleLogout = ()=>{
    signOut(auth)
    .then(()=>{
      toast.success("Logout Successfully!")
    })
    .catch((error)=>{
      toast.error(error.message);
    })
  }

  if(!user){
    return <p><Loader/></p>
  }else{
    return (
      <div>
        <Header/>
        <h1>Profile page</h1>
        <h2>User Id: {user.uid}</h2>
        <h2>user name: {user.name}</h2>
        <h2>user Email: {user.email}</h2>
        
        <Button btnName="Logout" onClick={handleLogout}/>
        </div>
    )
  }
 
}
 export default  Profile;