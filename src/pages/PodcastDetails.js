import React from "react";
import Header from "../components/commonComp/Header/index";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { db, auth } from "../firebase";
import Button from "../components/commonComp/Button";
import { onSnapshot, query, collection } from "firebase/firestore";
// import { useDispatch } from "react-redux";
import EpisodeDetails from "../components/Podcasts/EpisodeDetails";
import AudioPlayer from "../components/Podcasts/AudioPlayer/index";

function PodcastDetails() {
  const { id } = useParams();
  console.log("iD--", id);
  const [podcast, setPodcast] = useState({});
  const [episodes, setEpisodes] = useState();
  const [playingFile, setPlayingFile] = useState();

  const navigate = useNavigate();
  

  useEffect(() => {
    if (id) {
      getdata();
    }
  }, [id]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts", id, "episodes")),
      (querySnapshot) => {
        const episodeData = [];
        querySnapshot.forEach((doc) => {
          episodeData.push({ id: doc.id, ...doc.data() });
        });

        setEpisodes(episodeData);
      },
      (error) => {
        console.error("Error in fetching episodes data", error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [id]);

  const getdata = async () => {
    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data", docSnap.data());
        setPodcast({ id: id, ...docSnap.data() });
        toast.success("Podcast Found!");
      } else {
        console.log("No such Podcast!");
        toast.error("No Such Podcast");
        navigate("/podcast");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  return (
    <div>
      <Header />
      <div className="input-wrapper" style={{ marginTop: "0" , marginBottom: "2rem"}}>
        {podcast.id && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginBottom: "1.1rem",
              }}
            >
              <h1 className="podcast-title-heading">{podcast.title}</h1>
              {podcast.createdBy === auth.currentUser.uid && (
                <Button
                  style={{width:"200px"}}
                  btnName="create Episode"
                  onClick={() => {
                    navigate(`/podcast/${id}/create-episode`);
                  }}
                />
              )}
            </div>

            <div className="banner-wrapper">
              <img src={podcast.bannerImage} alt={podcast.title} />
            </div>

            <p className="podcast-desc">{podcast.descrition}</p>
            <h1 className="podcast-title-heading">Episodes</h1>
            
            {episodes.length > 0 ? (
              
                <>
                  {episodes.map((episode, index) => {
                    return (
                    <EpisodeDetails
                    key={index}
                      index = {index+1}
                      title={episode.title}
                      desc={episode.description}
                      audioFile={episode.audioFile}
                      onClick={(file) => setPlayingFile(file)}
                    />
                    );
                  })}
                </>
            
              
            ): <p>No Episodes</p>
          
          }
          </>
        )}
      </div>
      {playingFile && <AudioPlayer audioSrc={playingFile} imageSrc ={podcast.displayImage}/>}
    </div>
  );
}

export default PodcastDetails;
