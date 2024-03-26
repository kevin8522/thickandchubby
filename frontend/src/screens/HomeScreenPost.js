import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Post from "../components/Post";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import DesktopHeader from "../components/DesktopHeader";

import '../Home.css'
import MobileHeader from "../components/MobileHeader";
// import data from '../data';

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, posts: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreenPost() {
  const [{ loading, error, posts }, dispatch] = useReducer(reducer, {
    posts: [],
    loading: true,
    error: "",
  });
  // const [posts, setposts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/posts");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }

      // setposts(result.data);
    };
    fetchData();
  }, []);
  return (
    
     
     <div className='home' >
     <Helmet>
       <title>Find Thick and Chubby</title>
     </Helmet>
     <div className='home_desktop' >
       <DesktopHeader />
       {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
         <div className="home_desktop_user_list" >
          
            {posts.map((post) => (
      
                <Post  key={post.slug} post={post}></Post>
         
            ))}
        </div>
        )}
     </div>
     <div className='home_mobile' >
       <MobileHeader />
    
       {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div className="home_mobile_list" >
            {posts.map((post) => (
            
                <Post key={post.slug} post={post}></Post>
              
            ))}
           </div>
        )}
  
       
     </div>
   </div>
  );
}
export default HomeScreenPost;
