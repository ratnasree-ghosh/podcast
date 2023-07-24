import React from "react";
import { useState } from "react";
import "./style.css";

function FileInputComp({ id, accept, fileHandleFnc, inputName }) {
  const [fileSelect, setFileSelecet] = useState(false);
  const [fileArr, setFileArr] = useState([]);
  // const [bannerImg, setBannerImg] = useState(null);

  function handleChnage(e) {
    console.log(e.target.files);
    setFileArr(e.target.files);
    fileHandleFnc(e.target.files[0]);
    
      setFileSelecet(true); 
    
      
    
    
    setFileSelecet(true);
    // setBannerImg(URL.createObjectURL(e.target.files[0]));
    
  }
  return (
    <>
      <label
        htmlFor={id}
        className="custom-input"
       style={!fileSelect?{color: "#8f8297" }: {color: "white", borderColor: "green"}}
      >
        {fileSelect ? `${fileArr[0].name} selected` : inputName}
      </label>
      <input
        type="file"
        id={id}
        accept={accept}
        style={{ display: "none" }}
        onChange={handleChnage}
      />
    </>
  );
}

export default FileInputComp;
