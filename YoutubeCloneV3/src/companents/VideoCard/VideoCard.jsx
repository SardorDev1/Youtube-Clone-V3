import { Avatar, Card, CardContent, CardMedia, Typography, Box, Stack } from '@mui/material'
import React from 'react'
import moment from 'moment'
import { CardActionArea } from '@mui/material'
import { Padding, Title } from '@mui/icons-material';
import { Colors } from '../constants/Colors';
import { Link, useParams } from 'react-router-dom';
export default function VideoCard({ videos  }) {
    function replaceSymbols(text) {
        return text.replace(/&#39;/g, "'").replace(/&amp;/g, "&");
    }
    return (
        <>
          
                <Card className='VideoCard' sx={{ marginBottom: "10px", width: "350px", boxShadow: "none", borderRadius: "10px", backgroundColor: "#f5f5f5" }}>
                    <CardActionArea>
                        <Link to={`/video/${videos.id.videoId}`} >
                            <CardMedia image={videos?.snippet?.thumbnails?.high?.url} sx={{ width: "360px", height: "180px" }} />
                        </Link>
                        <CardContent sx={{ height: "110px" }}>
                            <Link to={`/video/${videos.id.videoId}`} >
                                <Typography variant='title' fontWeight={"bold"} ml={1} sx={{ display: "flex", alignItems: "center", color: Colors.black }}  >
                                    {replaceSymbols(videos?.snippet?.title)}
                                </Typography>
                            </Link>
                            <Box mt={1} sx={{ display: "flex" }} ml={1} >
                                <Link to={`/channel/${videos?.snippet.channelId}`} >
                                    <Box mt={1} sx={{ display: "flex" }} ml={1} >
                                        <Avatar src={videos?.snippet?.thumbnails?.high?.url} sx={{ width: "50px", height: "50px" }} />
                                        <Typography variant='title' fontWeight={"bold"} ml={1} sx={{ display: "flex", alignItems: "center", color: Colors.black }}  >
                                            {videos?.snippet?.channelTitle}
                                        </Typography>
                                    </Box>
                                </Link>
                            </Box>
                        </CardContent>
                        <Typography mr={1} mb={1} sx={{ opacity: ".6", display: "flex", justifyContent: "flex-end" }}  >
                            {moment(videos?.snippet?.publishedAt).fromNow()}
                        </Typography>
                    </CardActionArea>
                </Card >

         
        </>
    )
}
