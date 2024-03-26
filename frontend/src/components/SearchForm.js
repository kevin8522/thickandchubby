import React, { useState } from 'react'
import '../SearchForm.css'
import { useNavigate } from 'react-router-dom';

//icons
import SearchIcon from '@mui/icons-material/Search';


function SearchForm() {

    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        navigate(query ? `/search/?query=${query}` : '/search');
    };



    return (
        <form onSubmit={submitHandler} className='search_form_desktop' >
            <input onChange={(e) => setQuery(e.target.value)} type="text" placeholder='Search Users' className='search_form_desktop_input' />
            <button type='submit' className='search_form_desktop_btn' >
                <SearchIcon />
            </button>
        </form>
    )
}

export default SearchForm
