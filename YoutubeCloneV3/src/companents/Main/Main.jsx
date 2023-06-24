import { Box, CardActionArea, Container, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Colors } from '../constants/Colors'
import Category from '../Category/Category'
import { APIService } from "../service/ApiService"
import { Video } from '..'
import { useNavigate } from 'react-router-dom'


export default function Main() {


  const navigate = useNavigate()
  const [SelectedCategory, setSelectedCategory] = useState("New")

  const [VideoData, setVideoData] = useState([])
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await APIService.fetching(`/search?part=snippet&q=${SelectedCategory}`)
        setVideoData(data.items)


      } catch (error) {
        console.log(error);
      }
    }
    getData()
  }, [SelectedCategory])
  const SelectedCategoryHandler = category => setSelectedCategory(category)
  return (
    <>
      <Stack>
        <Category SelectedCategoryHandler={SelectedCategoryHandler} SelectedCategory={SelectedCategory} />
        <Box p={0} sx={{ height: "90vh" }}>
          <Container maxWidth="90%" >
            <Typography variant='h4' mt={2} fontWeight={"bold"} ml={2} mb={2} >

              {SelectedCategory} <span style={{ color: Colors.white }} >videos</span>

            </Typography>
            <Video videos={VideoData} />
          </Container>
        </Box>
      </Stack>
    </>
  )
}
