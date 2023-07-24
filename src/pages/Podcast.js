import React from "react";
import Header from "../components/commonComp/Header/index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { onSnapshot, query, collection } from "firebase/firestore";
import { db } from "../firebase";
import { setPodcast } from "../slices/podcastSlice";
import PodcastCard from "../components/Podcasts/PodcastCard";
import InputComponenet from "../components/commonComp/Input/index";

const Podcast = () => {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcast.podcast);
  const [search, setSearch] = useState("");
  
  

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data() });
        });

        dispatch(setPodcast(podcastsData));
      },
      (error) => {
        console.error("Error in fetching podcasts data", error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  

  const filteredPodcast = podcasts.filter((item) =>
    item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
  );
  console.log(filteredPodcast);
  return (
    <div>
      <Header />
      <div className="input-wrapper" style={{ marginTop: "2rem" }}>
        <h1 style={{marginBottom: "1.5rem", fontSize: "25px"}}>Discover Podcasts</h1>
        <InputComponenet
          type="search"
          placeholder="Search By Title"
          setState={setSearch}
          state={search}
        />
        {filteredPodcast.length > 0 ? (
          <div className="podcasts-flex">
            {filteredPodcast.map((item) => {
              return (
                <PodcastCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  displayImg={item.displayImage}
                />
              );
            })}
          </div>
        ) : (
          <p>No Podcasts Found!</p>
        )}
      </div>
    </div>
  );
};
export default Podcast;
