function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link style={{ color: "gray" }} to={"/"}>
        Youtube V3
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
import React, { useState } from 'react'
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container } from '@mui/material';
import { ExitToAppSharp } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../service/Auth';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { createTheme, ThemeProvider } from '@mui/material/styles';



export default function SignUp() {
  const [name, setName] = useState()
  const [surename, setSureName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const defaultTheme = createTheme();
  const navigator = useNavigate()

  const OnSignUpHandler = (e) => {
    e.preventDefault()
    localStorage.setItem("name", name)
    localStorage.setItem("surename", surename)
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user
        navigator('/')
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
      })
  }


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'black' }}>
            <ExitToAppSharp />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={OnSignUpHandler} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  onChange={(e) => setName(e.target.value)}
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  onChange={(e) => setSureName(e.target.value)}

                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  onChange={(e) => setEmail(e.target.value)}

                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}

                  id="password"
                  autoComplete="new-password"
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid sx={{ margin: "auto" }} item>
                <Link to={"/login"} style={{ color: "gray" }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )
}
