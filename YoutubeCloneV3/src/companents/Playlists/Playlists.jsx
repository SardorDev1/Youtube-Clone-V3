import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { APIService } from '../service/ApiService'
import { Card, Stack, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import { PlaylistPlayOutlined } from "@mui/icons-material"
import { Colors } from '../constants/Colors'
import moment from "moment"
export default function Playlists() {

  const { id } = useParams()
  const [playlistVideos, setPlaylistVideos] = useState([])
  function replaceSymbols(text) {
    return text.replace(/&#39;/g, "'").replace(/&amp;/g, "&");
  }

  useEffect(() => {
    const GetDataPlaylistvideos = async () => {
      try {
        const getPlaylistVideos = await APIService.fetching(`/playlistItems?playlistId=${id}&part=snippet%2Cid&order=date`)
        setPlaylistVideos(getPlaylistVideos?.items)
      } catch (error) {
        console.error(error);
      }

    }
    GetDataPlaylistvideos()
  }, [id])

  return (
    <>
      <Stack mt={5} width={"100%"} direction={"row"} flexWrap={"wrap"} justifyContent={"center"} alignItems={"center"} gap={2}  >
        {playlistVideos.map((playlistvideo) => (
          <>
            <Link to={`/video/${playlistvideo?.snippet?.resourceId?.videoId}`}>
              <Card className='VideoCard' sx={{ marginBottom: "10px", width: "350px", boxShadow: "none", borderRadius: "10px", backgroundColor: "#f5f5f5", }}>
                <CardActionArea>

                  <CardMedia image={playlistvideo?.snippet?.thumbnails?.high?.url} sx={{ width: "360px", height: "180px" }} />

                  <CardContent sx={{ height: "110px" }}>

                    <Typography variant='title' fontWeight={"bold"} ml={1} sx={{ display: "flex", alignItems: "center", color: Colors.black }}  >
                      <PlaylistPlayOutlined style={{ marginRight: "20px" }} />    {replaceSymbols(playlistvideo?.snippet?.title)}
                    </Typography>

                  </CardContent>
                  <Typography mr={1} mb={1} sx={{ opacity: ".6", display: "flex", justifyContent: "flex-end" }}  >
                    {moment(playlistvideo?.snippet?.publishedAt).fromNow()}
                  </Typography>
                </CardActionArea>
              </Card ></Link>
          </>
        ))}
      </Stack>
    </>
  )
}
