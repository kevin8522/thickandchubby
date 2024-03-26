import React from 'react'

function drawer() {
  return (
    <div className='mobile_header_drawer' >
    <div className='mobile_header_drawer_left' >  
      <div className='mobile_header_drawer_left_top' >
          <Link to='/'>
            <img src='/logo.png' alt='' className='mobile_header_drawer_left_top_img' />
          </Link>
      </div> 
      <div className='mobile_header_drawer_left_center'>
          <Link to='/' style={{textDecoration: 'none'}} >
          <div className='mobile_header_drawer_left_center_link_con' >
            <span className='mobile_header_drawer_left_center_link_con_left' >
            <HomeIcon />
            </span>
            <span className='mobile_header_drawer_left_center_link_con_right' >Home</span>
          </div>
          </Link>
          <Link to='/' style={{textDecoration: 'none'}} >
          <div className='mobile_header_drawer_left_center_link_con' >
            <span className='mobile_header_drawer_left_center_link_con_left' >
            <FavoriteIcon />
            </span>
            <span className='mobile_header_drawer_left_center_link_con_right' >Favorite</span>
          </div>
          </Link>
          <Link to='/search' style={{textDecoration: 'none'}} >
          <div className='mobile_header_drawer_left_center_link_con' >
            <span className='mobile_header_drawer_left_center_link_con_left' >
            <SearchIcon />
            </span>
            <span className='mobile_header_drawer_left_center_link_con_right' >Explore</span>
          </div>
          </Link>
          <Link to={`/datingprofile/`} style={{textDecoration: 'none'}} >
          <div className='mobile_header_drawer_left_center_link_con' >
            <span className='mobile_header_drawer_left_center_link_con_left' >
            <PersonIcon />
            </span>
            <span className='mobile_header_drawer_left_center_link_con_right' >Profile</span>
          </div>
          </Link>
      </div>
      <div className='mobile_header_drawer_left_bottom' >
      
          <button className='mobile_header_drawer_left_bottom_con' >
            <span className='mobile_header_drawer_left_bottom_left' >
            <LockIcon />
            </span>
            <span className='mobile_header_drawer_left_bottom_right' >
             LOG OUT
            </span>
          </button>
          
      </div>
    </div>
   
  </div>
  )
}

export default drawer