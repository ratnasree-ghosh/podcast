import React from 'react';
import Header from '../components/commonComp/Header/index';
import StartAPodcastForm from '../components/StarAPodComp/StartAPodcastForm';

 const StartAPodcast = () => {
  return (
    <div>
      <Header/>
      <div className="input-wrapper">
      <h1>Create A New Podcast</h1>

      <StartAPodcastForm/>
      </div>
      
      
      </div>
  )
}
 export default StartAPodcast;