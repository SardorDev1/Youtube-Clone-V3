import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { APIService } from '../service/ApiService'

import { Avatar, Box, CardContent, Chip, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import ReactPlayer from 'react-player'
import Loader from '../constants/Loader'
import { AirplaneTicket, SwipeUpAlt, CheckCircle, ExpandLess, ExpandMore, FavoriteOutlined, MarkChatRead, StarBorder, Tag, Visibility, } from '@mui/icons-material'
import { render } from 'react-dom'
import ThumbUpAltSharpIcon from '@mui/icons-material/ThumbUpAltSharp';
import { Video } from '..'

export default function VideoDetails() {
  const { id } = useParams()
  const [videoDetail, setVideoDetail] = useState(null)
  const [relatedVideos, setRelatedVideos] = useState([])
  const [comments, setComments] = useState([])

  const [openTags, setOpenTags] = React.useState(true);
  const [openComments, setOpenComments] = React.useState(true);
  function replaceSymbols(text) {
    return text.replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(`<a href="`, "").replace(`">`, "").replace(`">`, "").replace(`</a>`, "");
  }
  const handleClickTags = () => {
    setOpenTags(!openTags);
  };
  const handleClickComments = () => {
    setOpenComments(!openComments);
  };
  useEffect(() => {

    const getData = async () => {
      const data = await APIService.fetching(`/videos?part=snippet,statistics&id=${id}`)
      setVideoDetail(data.items[0])
      const ReData = await APIService.fetching(`/search?part=snippet&relatedToVideoId=${id}&type=video`)
      setRelatedVideos(ReData.items)
      console.log(ReData.items);
      const commentData = await APIService.fetching(`/commentThreads?part=snippet&videoId=${id}`)
      setComments(commentData.items)
    }
    getData()


  }, [id])
  if (!videoDetail?.snippet) return <Loader />
  return (

    <Box mt={5} mx={2} mb={10} minHeight={"90vh"} >
      <Box className="ContainerDetails" sx={{ display: "flex" }}>
        <Box className={"Left"} width={"65%"}  >
          <ReactPlayer style={{ borderRadius: "10px" }} url={`https://www.youtube.com/watch?v=${id}`} className={"ReactPlayer"} controls />
          <Stack sx={{ flexWrap: "wrap" }} mt={3} direction='row' gap='20px' alignItems='center' py={1} px={2}>
            <Stack sx={{ opacity: 0.7 }} direction='row' alignItems='center' gap='3px'>
              <Visibility />
              {parseInt(videoDetail?.statistics?.viewCount).toLocaleString()} views
            </Stack>
            <Stack sx={{ opacity: 0.7 }} direction='row' alignItems='center' gap='3px'>
              <FavoriteOutlined />
              {parseInt(videoDetail?.statistics?.likeCount).toLocaleString()} likes
            </Stack>
            <Stack sx={{ opacity: 0.7 }} direction='row' alignItems='center' gap='3px'>
              <MarkChatRead />
              {parseInt(videoDetail?.statistics?.commentCount).toLocaleString()} comment
            </Stack>
          </Stack>
          <Typography variant='h5' fontWeight='bold' p={2}>
            {replaceSymbols(videoDetail?.snippet?.title)}
          </Typography>
          <Typography variant='subtitle2' p={2} sx={{ opacity: '.7' }}>

            {replaceSymbols(videoDetail?.snippet?.description)}
          </Typography>
          <Stack direction='row' py={1} px={2}>
            <Link to={`/channel/${videoDetail?.snippet?.channelId}`}>
              <Stack direction='row' alignItems='center' gap='5px' marginTop='5px'>
                <Avatar sx={{ width: "60px", height: "60px" }}
                  alt={videoDetail?.snippet?.channelTitle}
                  src={videoDetail?.snippet?.thumbnails?.default?.url}
                />
                <Typography variant='subtitle2' color='gray'>
                  {videoDetail.snippet.channelTitle}
                  <CheckCircle sx={{ fontSize: '12px', color: 'gray', ml: '5px' }} />
                </Typography>
              </Stack>
            </Link>
          </Stack>

          <ListItemButton sx={{ marginTop: "20px", borderRadius: "10px" }} onClick={handleClickTags}>

            <ListItemText primary={'Show Tags'} />
            {openTags ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openTags} timeout="auto" >
            <List component="div" >


              {videoDetail.snippet.tags ? (
                <Typography sx={{ display: "flex", flexWrap: "wrap" }}>
                  {videoDetail?.snippet?.tags?.map((item, idx) => (
                    <Chip
                      label={item}
                      key={idx}
                      sx={{ marginTop: '10px', cursor: 'pointer', ml: '10px' }}
                      deleteIcon={<Tag />}
                      onDelete={() => { }}
                      variant='outlined'
                    />
                  ))}
                </Typography>
              ) : <Typography ml={2} mt={2} variant='h5'  >No Tags</Typography>}

            </List>
          </Collapse>
          <ListItemButton sx={{ marginTop: "20px", borderRadius: "10px" }} onClick={handleClickComments}>

            <ListItemText primary={'Show Comments'} />
            {openComments ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openComments} timeout="auto" >
            <List component="div" >

              {/* <CardContent sx={{ background: "#f5f5f5", marginTop: "20px", borderRadius: "12px" }}>
                      <Box sx={{ background: "#f5f5f5", marginTop: "20px", borderRadius: "12px", display: "flex", justifyContent: "space-beetwen" }}>
                        <Link to={commentDatas.snippet.topLevelComment.snippet.authorChannelUrl}>
                          <Box sx={{ width: "100%", height: "100%", display: "flex" }}>
                            <Avatar src={commentDatas.snippet.topLevelComment.snippet.authorProfileImageUrl} sx={{ width: "50px", height: "50px" }} />
                            <Typography ml={1} sx={{ color: "black ", fontFamily: "Arial, Helvetica, sans-serif", display: "flex", alignItems: "center" }} variant='p' >
                              {replaceSymbols(commentDatas.snippet.topLevelComment.snippet.authorDisplayName)}
                            </Typography>
                          </Box>

                        </Link>
                        <Box>

                        </Box>
                      </Box>
                      <Box>
                        <Typography mt={4} ml={1} sx={{ color: "black ", fontFamily: "Arial, Helvetica, sans-serif", display: "flex", alignItems: "center" }} variant='p' >
                          {replaceSymbols(commentDatas.snippet.topLevelComment.snippet.textDisplay)}
                        </Typography>
                      </Box>
                    </CardContent> */}
                    
              {/* commentDatas.snippet.topLevelComment.snippet.textDisplay */}
              <Stack sx={{ flexWrap: "wrap" }}>
                {comments?.map((commentDatas, idx) => (
                  <>




                    <CardContent sx={{ width: "100%", background: "#f5f5f5", marginTop: "20px", borderRadius: "12px" }}>
                      <Box sx={{ background: "#f5f5f5", marginTop: "20px", borderRadius: "12px", display: "flex", justifyContent: "space-between" }}>
                        <Link to={`/channel/${commentDatas.snippet.topLevelComment.snippet.authorChannelId.value}`}>
                          <Box sx={{ width: "100%", height: "100%", display: "flex" }}>
                            <Avatar src={commentDatas.snippet.topLevelComment.snippet.authorProfileImageUrl} sx={{ width: "50px", height: "50px" }} />
                            <Typography ml={1} sx={{ color: "black ", fontFamily: "Arial, Helvetica, sans-serif", display: "flex", alignItems: "center" }} variant='p' >
                              {replaceSymbols(commentDatas.snippet.topLevelComment.snippet.authorDisplayName)}
                            </Typography>
                          </Box>

                        </Link>
                        <Box>
                          <Stack sx={{ opacity: 0.7 }} direction='row' alignItems='center' gap='3px'>
                            <ThumbUpAltSharpIcon />
                            {parseInt(commentDatas?.snippet?.topLevelComment.snippet.likeCount).toLocaleString()}
                          </Stack>
                        </Box>
                      </Box>
                      <Box>
                        <Typography mt={4} ml={1} sx={{ color: "black ", fontFamily: "Arial, Helvetica, sans-serif", display: "flex", alignItems: "center" }} variant='p' >
                          {replaceSymbols(commentDatas.snippet.topLevelComment.snippet.textDisplay)}
                        </Typography>
                      </Box>
                    </CardContent >


                  </>

                ))}
              </Stack>

            </List>
          </Collapse>
          {/* */}


        </Box>
        <Box className="BoxRight" width={{ xs: '100%', md: '25%' }}
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent='center'
          alignItems='center'

          maxHeight={'220vh'} >
          <Video videos={relatedVideos} />
        </Box>
      </Box>
    </Box >
  )
}
