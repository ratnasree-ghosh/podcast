import React from 'react'
import { Link } from 'react-router-dom';
import "./style.css";

function PodcastCard({id, title, displayImg}) {
  return (
    <Link to={`/podcast/${id}`}>
    <div className='podcast-card'>
         
        <img src={displayImg} alt={title} className='display-image-podcast' />
        <p className='title-podcast'>{title.toUpperCase()}</p>
        
    </div>
    </Link>
  )
}

export default PodcastCard