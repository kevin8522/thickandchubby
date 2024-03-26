import React, { useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import { toast } from 'react-toastify';
import { getError } from '../utils';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rating from '../components/Rating';
import LoadingBox from '../components/LoadingBox';
import DesktopHeader from '../components/DesktopHeader';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/Button';
import Post from '../components/Post'; // Changed from Product
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import '../Search.css';
//drawer
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import FilterListIcon from '@mui/icons-material/FilterList';

//Accordion
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

//icons
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        posts: action.payload.posts, // Changed from products
        page: action.payload.page,
        pages: action.payload.pages,
        countPosts: action.payload.countPosts, // Changed from countProducts
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const ages = [
  {
    name: '20 to 29',
    value: '20-29',
  },
  {
    name: '30 to 50',
    value: '30-50',
  },

];

export const ratings = [
  {
    name: '4stars & up',
    rating: 4,
  },

  {
    name: '3stars & up',
    rating: 3,
  },

  {
    name: '2stars & up',
    rating: 2,
  },

  {
    name: '1stars & up',
    rating: 1,
  },
];

export default function SearchScreenPost() {
  const [name, setQuery] = useState('');
  const submitHandler = (e) => {
      e.preventDefault();
      navigate(name ? `/search/?query=${name}` : '/search');
  };

  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const category = sp.get('category') || 'all';
  const birth = sp.get('birth') || 'all';
  const body = sp.get('body') || 'all';
  const country = sp.get('country') || 'all';
  const query = sp.get('query') || 'all';
  const age = sp.get('age') || 'all';
  const order = sp.get('order') || 'newest';
  const page = sp.get('page') || 1;

  const [{ loading, error, posts, pages, countPosts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/posts/search?page=${page}&query=${query}&category=${category}&birth=${birth}&body=${body}&country=${country}&age=${age}&order=${order}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [category, birth, body, country, error, order, page,  age, query]);

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const { data } = await axios.get(`/api/posts/categories`);
        setCountries(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCountries();
  }, [dispatch]);

  const getFilterUrl = (filter, skipPathname) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterBirth = filter.birth || birth;
    const filterBody = filter.body || body;
    const filterCountry = filter.country || country;
    const filterQuery = filter.query || query; 
    const filterAge = filter.age || age;
    const sortOrder = filter.order || order;
    return `${skipPathname ? '' : '/search?'
      }category=${filterCategory}&query=${filterQuery}&country=${filterCountry}&birth=${filterBirth}&body=${filterBody}&age=${filterAge}&order=${sortOrder}&page=${filterPage}`;
  };

  //drawer
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <div className='search_filter_con' >
          <div className='search_filter_con_top' >
            <span>Filter</span>
          </div>
          <Divider />
          <div className='search_filter_con_bottom' >
            <div className='search_filter_con_bottom_child_1' >
              <div className='search_filter_con_bottom_child_1_top' >
                <span>Category</span>
              </div>
              <div className='search_filter_con_bottom_child_1_bottom' >

                <Link
                  style={{ textDecoration: 'none' }}
                  className={'all' === category ? 'text-bold' : ''}
                  to={getFilterUrl({ category: 'all' })}
                >
                  <span className='search_filter_con_bottom_child_1_bottom_all' >All</span>
                </Link>
                <Link
                  style={{ textDecoration: 'none' }}
                  className={'onenight' === category ? 'text-bold' : ''}
                  to={getFilterUrl({ category: 'onenight' })}
                >
                  <span className='search_filter_con_bottom_child_1_bottom_all' >Onenight</span>
                </Link>
                <Link
                  style={{ textDecoration: 'none' }}
                  className={'friends' === category ? 'text-bold' : ''}
                  to={getFilterUrl({ category: 'friends' })}
                >
                  <span className='search_filter_con_bottom_child_1_bottom_all' >Friends</span>
                </Link>
                <Link
                  style={{ textDecoration: 'none' }}
                  className={'relationship' === category ? 'text-bold' : ''}
                  to={getFilterUrl({ category: 'relationship' })}
                >
                  <span className='search_filter_con_bottom_child_1_bottom_all' >Relationship</span>
                </Link>
              </div>
            </div>

            <div className='search_filter_con_bottom_child_1' >
              <div className='search_filter_con_bottom_child_1_top' >
                <span>Age</span>
              </div>
              <div className='search_filter_con_bottom_child_1_bottom' >
                <li>
                  <Link
                    style={{ textDecoration: 'none' }}
                    className={'all' === age ? 'text-bold' : ''}
                    to={getFilterUrl({ age: 'all' })}
                  >
                    <span className='search_filter_con_bottom_child_1_bottom_all' >All</span>
                  </Link>
                </li>
                {ages.map((p) => (
                  <li key={p.value}>
                    <Link
                      style={{ textDecoration: 'none' }}
                      to={getFilterUrl({ age: p.value })}
                      className={p.value === age ? 'text-bold' : ''}
                    >
                      <span className='search_filter_con_bottom_child_1_bottom_all' >{p.name}</span>
                    </Link>
                  </li>
                ))}
              </div>
            </div>

            <div className='search_filter_con_bottom_child_1' >
              <div className='search_filter_con_bottom_child_1_top' >
                <span>Body</span>
              </div>
              <div className='search_filter_con_bottom_child_1_bottom' >
                <Link
                  style={{ textDecoration: 'none' }}
                  className={'all' === body ? 'text-bold' : ''}
                  to={getFilterUrl({ body: 'all' })}
                >
                  <span className='search_filter_con_bottom_child_1_bottom_all' >all</span>
                </Link>
                <Link
                  style={{ textDecoration: 'none' }}
                  className={'chubby' === body ? 'text-bold' : ''}
                  to={getFilterUrl({ body: 'chubby' })}
                >
                  <span className='search_filter_con_bottom_child_1_bottom_all' >Chubby</span>
                </Link>
                <Link
                  style={{ textDecoration: 'none' }}
                  className={'thick' === body ? 'text-bold' : ''}
                  to={getFilterUrl({ body: 'thick' })}
                >
                  <span className='search_filter_con_bottom_child_1_bottom_all' >thick</span>
                </Link>
                <Link
                  style={{ textDecoration: 'none' }}
                  className={'slim' === body ? 'text-bold' : ''}
                  to={getFilterUrl({ body: 'slim' })}
                >
                  <span className='search_filter_con_bottom_child_1_bottom_all' >slim</span>
                </Link>
              </div>
            </div>

            <div className='search_filter_con_bottom_child_1' >
              <div className='search_filter_con_bottom_child_1_top' >
                <span>Country</span>
              </div>
              <div className='search_filter_con_bottom_child_1_bottom' >
                <div className='search_filter_con_bottom_child_1_bottom_accordion' >
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      Select  Country
                    </AccordionSummary>
                    <AccordionDetails>
                      <Link
                        style={{ textDecoration: 'none' }}
                        className={'all' === country ? 'text-bold' : ''}
                        to={getFilterUrl({ country: 'all' })}
                      >
                        <span className='search_filter_con_bottom_child_1_bottom_all' >All</span>
                      </Link>
                      {countries.map((c) => (
                        <li key={c}>
                          <Link
                            style={{ textDecoration: 'none' }}
                            className={c === country ? 'text-bold' : ''}
                            to={getFilterUrl({ country: c })}
                          >
                            <span className='search_filter_con_bottom_child_1_bottom_all' >{c}</span>
                          </Link>
                        </li>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            </div>

            <div className='search_filter_con_bottom_child_1' >
              <div className='search_filter_con_bottom_child_1_top' >
                <span>Birth Year</span>
              </div>
              <div className='search_filter_con_bottom_child_1_bottom' >
                <div className='search_filter_con_bottom_child_1_bottom_accordion' >
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      Select  Year
                    </AccordionSummary>
                    <AccordionDetails>
                      <Link
                        style={{ textDecoration: 'none' }}
                        className={'all' === birth ? 'text-bold' : ''}
                        to={getFilterUrl({ birth: 'all' })}
                      >
                        <span className='search_filter_con_bottom_child_1_bottom_all' >All</span>
                      </Link>
                      <Link
                        style={{ textDecoration: 'none' }}
                        className={'2000' === birth ? 'text-bold' : ''}
                        to={getFilterUrl({ birth: '2000' })}
                      >
                        <span className='search_filter_con_bottom_child_1_bottom_all' >2000</span>
                      </Link>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            </div>

          
          </div>
        </div>
      </List>
    </Box>
  );

  return (
    <div>
      <Helmet>
       <title>Search</title>
     </Helmet>
      <div className='search_desktop' >
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <DesktopHeader />
            {posts.length === 0 && (
              <MessageBox>No user Found</MessageBox>
            )}
            <div className='search_desktop_filter_results'  >
             
            </div>
            <div className='search_desktop_filter' >
              <div className='search_desktop_filter_left' >
              <span className='search_desktop_filter_results_text' >{countPosts === 0 ? 'No' : countPosts} Results </span>
              </div>
              <div className='search_desktop_filter_right' >
                {['top'].map((anchor) => (
                  <React.Fragment key={anchor}>
                    <button className='search_desktop_filter_right_btn' onClick={toggleDrawer(anchor, true)}>
                      <FilterListIcon /> <span>Filter</span>
                    </button>
                    <Drawer
                      anchor={anchor}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}
                    >
                      {list(anchor)}
                    </Drawer>
                  </React.Fragment>
                ))}
              </div>
              <div>

              </div>
            </div>
            <div className='search_desktop_user_con' >
              {posts.map((post) => (
                <Post key={post._id} post={post}></Post>
              ))}
            </div>
            <div className='desktop_pagination' >
              {[...Array(pages).keys()].map((x) => (
                <LinkContainer
                  key={x + 1}
                  className="mx-1"
                  to={{
                    pathname: '/search',
                    search: getFilterUrl({ page: x + 1 }, true),
                  }}
                >
                  <Button
                    className={Number(page) === x + 1 ? '' : ''}
                  >
                    {x + 1}
                  </Button>
                </LinkContainer>
              ))}
            </div>
          </>
        )}
      </div>

      <div className='search_mobile' >
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div className='search_mobile_search_form' >
              <div className='search_mobile_search_form_left' >
                <Link to='/'>
                  <span className='search_mobile_search_form_left_btn' ><ArrowBackIcon /></span>
                </Link>
              </div>
              <div className='search_mobile_search_form_center' >
                <form onSubmit={submitHandler} className='search_mobile_search_form_center_form' >
                  <input onChange={(e) => setQuery(e.target.value)} type="text" placeholder='Search Users' className='search_mobile_search_form_center_form_input' />
                </form>
              </div>
              <div className='search_mobile_search_form_right' >
                {['bottom'].map((anchor) => (
                  <React.Fragment key={anchor}>
                    <button className='search_mobile_filter_right_btn' onClick={toggleDrawer(anchor, true)}>
                      <FilterListIcon />
                    </button>
                    <Drawer
                      anchor={anchor}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}
                    >
                      {list(anchor)}
                    </Drawer>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className='search_mobile_filter' >
              <div className='search_mobile_filter_left' >
              <span className='search_mobile_filter_left_results' >{countPosts === 0 ? 'No' : countPosts} Results</span>
              </div>
              <div className='search_mobile_filter_right' >
              </div>
            </div>
            <div className='search_mobile_list' >
              {posts.map((post) => (
                <Post key={post._id} post={post}></Post>
              ))}
            </div>
            <div className='mobile_pagination' >
              {[...Array(pages).keys()].map((x) => (
                <LinkContainer 
                  key={x + 1}
                  className="mx-1"
                  to={{
                    pathname: '/search',
                    search: getFilterUrl({ page: x + 1 }, true),
                  }}
                >
                  <Button
                    className={Number(page) === x + 1 ? '' : ''}
                  >
                    {x + 1}
                  </Button>
                </LinkContainer>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
