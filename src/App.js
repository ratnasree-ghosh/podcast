import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/Signup";
import Podcast from "./pages/Podcast";
import Profile from "./pages/Profile";
import StartAPodcast from "./pages/StartAPodcast";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import PodcastDetails from "./pages/PodcastDetails";

import { onSnapshot } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "./firebase";
import { useDispatch } from "react-redux";
import { setUser } from "./slices/userSlice";
import PrivateRoutes from "./components/commonComp/PrivateRoutes";
import CreateEpisode from "./pages/CreateEpisode";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unSubscribeSnapShot = onSnapshot(
          doc(db, "Users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: userData.uid,
                })
              );
            }
          },
          (error) => {
            console.log("Error in fetching user data", error);
          }
        );

        return () => {
          unSubscribeSnapShot();
        };
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, [dispatch]);

  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route element={<PrivateRoutes/>}>
            <Route path="/podcast" element={<Podcast />} />
            <Route path="/start-a-podcast" element={<StartAPodcast />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/podcast/:id" element={<PodcastDetails />} />
            <Route path="/podcast/:id/create-episode" element={<CreateEpisode />} />

            
          </Route>
         
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
