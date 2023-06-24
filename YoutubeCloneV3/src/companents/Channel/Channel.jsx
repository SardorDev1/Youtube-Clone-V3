import React, { useEffect, useState } from 'react'
import { APIService } from '../service/ApiService'
import { Link, useParams } from 'react-router-dom'
import { Avatar, Box, Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import Loader from '../constants/Loader'

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Colors } from '../constants/Colors'
import moment from 'moment'
import SwipeableViews from 'react-swipeable-views'
import { useTheme } from '@emotion/react'
import { PlaylistPlayOutlined } from '@mui/icons-material'
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function Channel() {
  const [channelDetail, setChannelDetail] = useState()
  const [videos, setVideos] = useState([])
  const { id } = useParams()

  const [value, setValue] = React.useState(0);
  const [playlist, setPlaylist] = useState([])



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function replaceSymbols(text) {
    return text.replace(/&#39;/g, "'").replace(/&amp;/g, "&");
  }
  useEffect(() => {
    const getData = async () => {
      try {
        const dataChannelDetail = await APIService.fetching(`/channels?part=snippet&id=${id}`)
        setChannelDetail(dataChannelDetail.items[0])
        const dataVideo = await APIService.fetching(`/search?channelId=${id}&part=snippet%2Cid&order=date`)
        if (dataVideo.items[0] === undefined) {
          setVideos({ error: "This channel doesn't have any Video Content" })
        } else {
          setVideos(dataVideo?.items)
        }
        const PlaylistsData = await APIService.fetching(`/playlists?channelId=${id}&part=snippet%2Cid&order=date`)

        if (PlaylistsData.items[0] === undefined) {
          setPlaylist({ error: "This channel doesn't have any Playlists" })
        } else {

          setPlaylist(PlaylistsData?.items)
        }

      } catch (error) {
        console.log(error)
      }

    }

    getData()

  }, [id])
  const theme = useTheme();


  const handleChangeIndex = (index) => {
    setValue(index);
  };


  if (!channelDetail) {
    return <Loader />
  }

  return (
    <>

      {/*  */}
      <Box sx={{ width: '100%' }}>
        <Box sx={{ flexWrap: "wrap", borderBottom: 1, borderColor: 'divider' }}>

          <Tabs variant="fullWidth"
            className='Tabs' value={value} onChange={handleChange}>
            <Tab className='tabchannelcontrols' label="Channel" {...a11yProps(0)} />
            <Tab className='tabchannelcontrols' label="Channel Videos" {...a11yProps(1)} />
            <Tab className='tabchannelcontrols' label="About" {...a11yProps(2)} />
            <Tab className='tabchannelcontrols' label="Playlists" {...a11yProps(3)} />
          </Tabs>
        </Box>

        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}>
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Stack width={"100%"} height={"230px"} sx={{ backgroundSize: "100%", backgroundRepeat: "no-repeat", backgroundImage: `url(${channelDetail?.brandingSettings?.image?.bannerExternalUrl})`, backgroundAttachment: "fixed", backgroundPosition: "bottom" }}>

            </Stack>
            <Stack width={"90%"} margin={"auto"} >
              <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}  >
                <CardContent sx={{ textAlign: "center" }}>
                  <Avatar sx={{ width: "180px", margin: "auto", height: "180px" }} src={channelDetail.snippet?.thumbnails?.high.url} />
                  <Box>
                    <Typography variant='h3' ml={1} >{channelDetail.snippet?.title}</Typography>
                    <Typography variant='h6' color={"gray"} ml={1} >{channelDetail.snippet?.customUrl}</Typography>

                    <Typography fontFamily={"Arial, Helvetica, sans-serif"} variant='h5' color={"gray"} ml={1} >{parseInt(channelDetail.statistics?.subscriberCount).toLocaleString()} Subscribers </Typography>
                    <Typography fontFamily={"Arial, Helvetica, sans-serif"} variant='h6' color={"gray"} ml={1} >{parseInt(channelDetail.statistics?.videoCount).toLocaleString()} Videos </Typography>

                  </Box>

                </CardContent>

              </Box>
            </Stack>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Stack width={"100%"} direction={"row"} flexWrap={"wrap"} justifyContent={"center"} alignItems={"center"} gap={2}  >
              {videos === [{ error: "This channel doesn't have any Video Content" }] ? (
                <Typography variant='h5' fontFamily={"Arial, Helvetica, sans-serif"} >
                  {videos.error}
                </Typography>
              ) : (
                <>
                  {videos.map((video) => (
                    <>

                      <Card key={video.id} className='VideoCard' sx={{ marginBottom: "10px", width: "350px", boxShadow: "none", borderRadius: "10px", backgroundColor: "#f5f5f5", }}>
                        <CardActionArea>
                          <Link to={`/video/${video.id.videoId}`} >
                            <CardMedia image={video?.snippet?.thumbnails?.high?.url} sx={{ width: "360px", height: "180px" }} />
                          </Link>
                          <CardContent sx={{ height: "110px" }}>
                            <Link to={`/video/${video.id.videoId}`} >
                              <Typography variant='title' fontWeight={"bold"} ml={1} sx={{ display: "flex", alignItems: "center", color: Colors.black }}  >
                                {replaceSymbols(video?.snippet?.title)}
                              </Typography>
                            </Link>
                            <Box mt={1} sx={{ display: "flex" }} ml={1} >
                              <Link to={`/channel/${video?.snippet.channelId}`} >
                                <Box mt={1} sx={{ display: "flex" }} ml={1} >
                                  <Avatar src={channelDetail.snippet?.thumbnails?.high.url} sx={{ width: "50px", height: "50px" }} />
                                  <Typography variant='title' fontWeight={"bold"} ml={1} sx={{ display: "flex", alignItems: "center", color: Colors.black }}  >
                                    {video?.snippet?.channelTitle}
                                  </Typography>
                                </Box>
                              </Link>
                            </Box>
                          </CardContent>
                          <Typography mr={1} mb={1} sx={{ opacity: ".6", display: "flex", justifyContent: "flex-end" }}  >
                            {moment(video?.snippet?.publishedAt).fromNow()}
                          </Typography>
                        </CardActionArea>
                      </Card >
                    </>
                  ))}
                </>
              )}
              {/* */}
            </Stack>
            {/* */}
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>

            <Box sx={{ maxWidth: "1140px", margin: "auto", display: "flex", flexWrap: "wrap", justifyContent: "space-around", }}>
              <Stack className='LeftAboutChannel' maxWidth={"800px"}>
                <Typography variant='h5' color={"black"} fontFamily={"Arial, Helvetica, sans-serif"} >Description</Typography>
                <Typography variant='p' color={"black"} fontFamily={"Arial, Helvetica, sans-serif"} >
                  {channelDetail.snippet?.description}
                </Typography>
                <Box mt={5} sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }} >
                  <Avatar className='imageAboutChannelLogo' sx={{ width: "180px", margin: "auto", height: "180px" }} src={channelDetail.snippet?.thumbnails?.high.url} />

                  <img className='imageAboutBanner' style={{ margin: "auto", textAlign: "center", marginTop: "40px" }} src={channelDetail?.brandingSettings?.image?.bannerExternalUrl} />
                </Box>

              </Stack>
              <Stack className='RightAboutChannel' maxWidth={"200px"} >
                <Typography variant='h5' color={"black"} fontFamily={"Arial, Helvetica, sans-serif"} >About</Typography>
                <Typography variant='p' color={"black"} fontFamily={"Arial, Helvetica, sans-serif"} >
                  Joined {moment(channelDetail.snippet?.publishedAt).calendar()}
                </Typography><hr /><br />
                <Typography variant='h5' color={"black"} fontFamily={"Arial, Helvetica, sans-serif"} >Views</Typography>
                <Typography variant='p' color={"black"} fontFamily={"Arial, Helvetica, sans-serif"} >
                  {parseInt(channelDetail.statistics?.viewCount).toLocaleString()} views
                </Typography><hr /><br />
                <Typography variant='h5' color={"black"} fontFamily={"Arial, Helvetica, sans-serif"} >Views</Typography>
                <Typography variant='p' color={"black"} fontFamily={"Arial, Helvetica, sans-serif"} >
                  {channelDetail.snippet?.country}
                </Typography>
              </Stack>
            </Box>


          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <Stack width={"100%"} direction={"row"} flexWrap={"wrap"} justifyContent={"center"} alignItems={"center"} gap={2}  >
              {playlist === [{ error: "This channel doesn't have any Video Content" }] ? (
                <Typography variant='h5' fontFamily={"Arial, Helvetica, sans-serif"} >
                  {videos.error}
                </Typography>
              ) : (
                <>

                  {playlist.map((playlist_item) => (
                    <div key={playlist_item.id}>
                      <Link to={`/playlists/${playlist_item.id}`}>
                        <Card className='VideoCard' sx={{ marginBottom: "10px", width: "350px", boxShadow: "none", borderRadius: "10px", backgroundColor: "#f5f5f5", }}>
                          <CardActionArea>

                            <CardMedia image={playlist_item?.snippet?.thumbnails?.high?.url} sx={{ width: "360px", height: "180px" }} />

                            <CardContent sx={{ height: "110px" }}>

                              <Typography variant='title' fontWeight={"bold"} ml={1} sx={{ display: "flex", alignItems: "center", color: Colors.black }}  >
                                <PlaylistPlayOutlined style={{ marginRight: "20px" }} />    {replaceSymbols(playlist_item?.snippet?.title)}
                              </Typography>

                            </CardContent>
                            <Typography mr={1} mb={1} sx={{ opacity: ".6", display: "flex", justifyContent: "flex-end" }}  >
                              {moment(playlist_item?.snippet?.publishedAt).fromNow()}
                            </Typography>
                          </CardActionArea>
                        </Card >
                      </Link>
                    </div>
                  ))}
                </>

              )}
            </Stack>
          </TabPanel>
        </SwipeableViews>
      </Box>

    </>
  )
}