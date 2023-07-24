import React from "react";
import Header from "../components/commonComp/Header/index";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import InputComponenet from "../components/commonComp/Input";
import Button from "../components/commonComp/Button";
import FileInputComp from "../components/commonComp/Input/FileInputComp";
import {toast} from "react-toastify";
import {auth,db,storage} from "../firebase";
import { uploadBytes, getDownloadURL , ref} from "firebase/storage";
import { addDoc,collection } from "firebase/firestore";


function CreateEpisode() {

  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [audioFile, setAudioFile] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const audioFileFnc = (file)=>{
    setAudioFile(file)
  }

  const handleClick =  async()=>{
    setLoading(true);
    if(title && desc && audioFile){

      try{
        const audioRef = ref(
          storage,
          `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
        )
        await uploadBytes(audioRef, audioFile);

        const audioUrl = await getDownloadURL(audioRef);

        const episodeData ={
          title: title,
          description: desc,
          audioFile: audioUrl
        }

        await addDoc(
          collection(db, "podcasts", id, "episodes"), episodeData
        );

        toast.success("Episode Created Successfully!");
        setLoading(false);
        navigate(`/podcast/${id}`);

      }catch(e){
        toast.error(e.message);
        setLoading(false);
      }

    }else{
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }

  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>Create An Episode</h1>

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
          accept={"audio/*"}
          id="audio-file-input"
          fileHandleFnc={audioFileFnc}
          inputName="Select Audio File"
        />

        <Button
          btnName={loading ? "Loading..." : "Create An Episode"}
          onClick={handleClick}
          disabled={loading}
        />
      </div>
    </div>
  );
}

export default CreateEpisode;
