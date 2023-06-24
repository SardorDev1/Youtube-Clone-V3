import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from "../../assets/Logo.jpg"
import { Avatar, Box, Button, CardActionArea, Stack, Switch, Typography } from '@mui/material'
import { Colors } from '../constants/Colors'
import Searchbar from '../Search-bar/Searchbar'
import { CheckBox, Close, Label } from '@mui/icons-material'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../service/Auth'
export default function Navbar() {
  const [umounting, setUnMounting] = useState("No")
  const [isScrolled, setIsScrolled] = useState(false);
  const [userCriditional, setUserCriditional] = useState([])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setIsScrolled(scrollY > 200);

    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, []);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {

        setUserCriditional(user)
      }
    })
  })


  return (

    <>
      <Stack className={isScrolled ? 'Navbar scrolled' : 'Navbar'} direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{ height: "100%", paddingLeft: "20px", paddingRight: "20px", position: "sticky", top: 0, zIndex: 999, background: Colors.black }}  >

        <Link className='NavLogo' to={'/'}>
          <img width={80} height={80} src={Logo} alt="error img" />
        </Link>
        <Box className="NavSearch">
          <Searchbar  />
        </Box>
        <Box >
          <Box className="accountCard" width={"300px"} height={"500px"} sx={{ background: "#2d2d2d", position: "fixed", borderRadius: "10px", display: umounting === "No" ? "none" : "block", top: "5px", right: "5px" }} >
            <CardActionArea>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar sx={{ cursor: "pointer", margin: "20px", width: "60px", height: "60px" }} src={userCriditional.photoURL} />
                <Box>
                  <Typography color={"white"}>{localStorage.getItem("name")} {localStorage.getItem("surename")}</Typography>
                  <Typography variant='p' color={"white"}>{userCriditional.email}</Typography>

                </Box>


              </Box>
              
              <div onClick={() => setUnMounting("No")}>
                <Close sx={{ top: "5px", color: "white", cursor: "pointer", position: "absolute", right: "6px" }} />
              </div>
              <Button sx={{ display: "flex", margin: "auto", marginTop: "320px" }} color="error" onClick={() => signOut(auth)} variant="contained">Sign Out</Button>
            </CardActionArea>
          </Box>

          <div className='NavLogo' style={{ marginBottom: "20px", marginTop: "20px" }} onClick={() => setUnMounting("Yes")}>
            <Avatar sx={{ cursor: "pointer", width: "50px", height: "50px", opacity: umounting === "No" ? "1" : "0" }} src={userCriditional.photoURL} />
          </div>
        </Box>

      </Stack >
    </>
  )
}
