import React from "react";
import InputComponenet from "../commonComp/Input/index";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../commonComp/Button";
import FileInputComp from "../commonComp/Input/FileInputComp";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {auth,db,storage} from "../../firebase";
import { setDoc, doc , addDoc, collection} from "firebase/firestore";


function StartAPodcastForm() {
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [bannerImg, setBannerImg] = useState();
  const [displayImg, setDisplayImg] = useState();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    
    

    if(title && desc && bannerImg && displayImg){

        try{

            setLoading(true)
            //storing banner images in firebase storage and getting the downloadable link ----
            const bannerImageRef = ref(
                storage,
                `podcasts/${auth.currentUser.uid}/${Date.now()}`
            )
            await uploadBytes(bannerImageRef,bannerImg);
            
    
            const bannerImgUrl = await getDownloadURL(bannerImageRef);
            console.log("banner image url---", bannerImgUrl);

            //storing display images in firebase storage and getting the downloadale link ----

            const displayImageRef = ref(
                storage,
                `podcasts/${auth.currentUser.uid}/${Date.now()}`
            )
            await uploadBytes(displayImageRef,displayImg);
            
    
            const displayImgUrl = await getDownloadURL(displayImageRef);
            console.log("display image url---", displayImgUrl);


            const podcastData = {
                title: title,
                descrition: desc,
                bannerImage: bannerImgUrl,
                displayImage: displayImgUrl,
                createdBy: auth.currentUser.uid
            
            }
            const docRef = await addDoc(collection(db, "podcasts"), podcastData);

            setTitle("");
            setDesc("");
            setBannerImg(null);
            setDisplayImg(null);

            toast.success("New podcast created");
            setLoading(false);
            navigate("/podcast");
            

        } catch(e){
            toast.error(e.message);
            console.log(e);
            setLoading(false);
        }
        
    }else{
        toast.error("All Fields are mandatory!");
        setLoading(false);

    }
  };

  const bannerImgFnc = (file) => {
    setBannerImg(file);
  };

  const displayImgFnc = (file) => {
    setDisplayImg(file);
  };
  return (
    <>
      <InputComponenet
        type="text"
        placeholder="Title"
        required="true"
        setState={setTitle}
        state={title}
      />

      <InputComponenet
        type="text"
        placeholder="Description"
        required="true"
        setState={setDesc}
        state={desc}
      />

      <FileInputComp
        accept={"image/*"}
        id="banner-image-input"
        fileHandleFnc={bannerImgFnc}
        inputName="Select Banner Image"
        
      />
      <FileInputComp
        accept={"image/*"}
        id="display-image-input"
        fileHandleFnc={displayImgFnc}
        inputName="Select Display Image"
      />

      <Button
        btnName={loading ? "Loading..." : "Create A Podcast"}
        onClick={handleClick}
        disabled={loading}
        
      />
    </>
  );
}

export default StartAPodcastForm;
