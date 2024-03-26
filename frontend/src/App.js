import { BrowserRouter, Route, Routes } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import UserProfile from './screens/UserProfile';
import React from 'react';
import SearchScreen from './screens/SearchScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import ProfileScreen from './screens/ProfileScreen';
import Post from './screens/Post';

import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import Upload from './screens/Upload';
import MyProfile from './screens/MyProfile';
import HomeScreenPost from './screens/HomeScreenPost';
import SearchScreenPost from './screens/SearchScreenPost';
import ProductScreenPost from './screens/ProductScreenPost';
import EditPost from './screens/EditPost';
import ProductEditScreenPost from './screens/ProductEditScreenPost';
import ProductScreenPostMe from './screens/ProductScreenPostMe';
import ProductScreenPostMeLikes from './screens/ProductScreenPostMeLikes';
import CreateDatingProfileScreen from './screens/CreateDatingProfileScreen';
import FirstUpload from './screens/FirstUpload';

function App() {



  return (
    <BrowserRouter>


     

      <Routes>

         {/* search users profile */}
      <Route path="/search" element={<SearchScreenPost />} />

        
        {/* Upload image  */}
        <Route
          path="/updateimage"
          element={

            <Upload />

          }
        />

        {/*first Upload image  */}
        <Route
          path="/uploadimage"
          element={

            <FirstUpload />

          }
        />

         {/* first create  dating  profile  */}
         <Route
          path="/createdatingprofile"
          element={

            <CreateDatingProfileScreen/>

          }
        />



        {/*first Upload image  */}
        <Route
          path="/updatedatingprofile/:slug"
          element={

            <EditPost />

          }
        />

        {/* create dating profile  */}
        <Route
          path="/datingprofile"
          element={

            <Post />

          }
        />



        {/* see  user dating profile  */}
        <Route path="/user/:slug" element={<ProductScreenPost />} />


        {/* my dating profile page */}

        <Route path="/date/:slug" element={<ProductScreenPostMe />} />


        {/* my likes page */}

        <Route path="/likes/:slug" element={<ProductScreenPostMeLikes />} />


        {/* edit my dating profile  */}
        <Route
          path="/user/post/:id"
          element={
            <ProductEditScreenPost />
          }
        ></Route> 

        {/* edit My profile update */}
        <Route
          path="/profile"
          element={

            <ProfileScreen />

          }
        />

        <Route path="/signin" element={<SigninScreen />} />
        <Route path="/signup" element={<SignupScreen />} />

        <Route
          path="/forget-password"
          element={<ForgetPasswordScreen />}
        />
        <Route
          path="/reset-password/:token"
          element={<ResetPasswordScreen />}
        />


        {/* home page  */}
        <Route path="/" element={<HomeScreenPost />} />
      </Routes>



    </BrowserRouter>
  );
}

export default App;
