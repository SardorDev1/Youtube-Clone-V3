import { Paper } from '@mui/material'
import React, { useState } from 'react'
import { IconButton } from '@mui/material'
import { Search } from '@mui/icons-material'
import { Colors } from '../constants/Colors'
import { useNavigate } from 'react-router-dom'
export default function Searchbar() {
  const [searchres, setSearchRes] = useState('')
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    if (searchres) {
      navigate(`search/${searchres}`)
    }
  }
  return (
    <>
      <Paper onSubmit={submitHandler} className='PaperNAV' component={"form"} sx={{ border: `1x solid ${Colors.white}`, pl: 2, boxShadow: "none", background: Colors.black, border: `2px solid ${Colors.white}`, borderRadius: "20px" }} >
        <div className='search_bar_div' >
          <input type="text" value={searchres} onChange={e => setSearchRes(e.target.value)} placeholder='search ...' className='search-bar' />

          <IconButton type='submit' sx={{ color: Colors.white }}>
            <Search />
          </IconButton>
        </div>
      </Paper>
    </>)
}
