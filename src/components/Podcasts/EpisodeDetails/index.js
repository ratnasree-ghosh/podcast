import React from 'react';
import Button from '../../commonComp/Button/index';
import "./style.css"

function EpisodeDetails({title,desc,audioFile,onClick, index}) {
  return (
    <div className='episode-details' >
        <h1 >{index}. {title}</h1>
        <p>{desc}</p>
        <Button width={"100px"} btnName={"Play"} onClick={()=> onClick(audioFile)} style={{width: "100px", marginLeft: "2rem", marginTop: "1.7rem"}}/>
    </div>
  )
}

export default EpisodeDetails;