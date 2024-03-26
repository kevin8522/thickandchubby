import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
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
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    
     
     <div className='home' >
     <Helmet>
       <title>title</title>
     </Helmet>
     <div className='home_desktop' >
       <DesktopHeader />
       {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
         <div className="home_desktop_user_list" >
          
            {products.map((product) => (
      
                <Product  key={product.slug} product={product}></Product>
         
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
            {products.map((product) => (
            
                <Product key={product.slug} product={product}></Product>
              
            ))}
           </div>
        )}
  
       
     </div>
   </div>
  );
}
export default HomeScreen;
