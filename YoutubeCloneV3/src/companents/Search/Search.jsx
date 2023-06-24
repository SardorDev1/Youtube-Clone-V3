import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { APIService } from '../service/ApiService'
import { Box, Container, Typography } from '@mui/material'
import { Colors } from '../constants/Colors'
import { Video } from '..'


export default function Search() {
  const [videos, setVideos] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await APIService.fetching(`/search?part=snippet&q=${id}`)
        setVideos(data.items)

      } catch (error) {
        console.log("error" + error);
      }
    }
    getData()
  }, [id])
  return (
    <>
      <Box p={2} sx={{ height: "90vh" }}>
        <Container maxWidth={"90%"}>
          <Typography variant={'h4'} fontWeight={'bold'} mb={2} >
            Search results for <span style={{ color: Colors.white }} >{id}</span>
          </Typography>
          <Video videos={videos} />
        </Container>
      </Box>
    </>
  )
}
