import { CheckCircle } from '@mui/icons-material'
import { Avatar, Box, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function ChannelCard({ datas }) {
    function replaceSymbols(text) {
        return text.replace(/&#39;/g, "'").replace(/&amp;/g, "&");
    }
    return (
        <>

            <Stack className='channelCard' sx={{ borderRadius: "10px", backgroundColor: "#f8f8f8 ", }}   >


                <CardContent sx={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
                    <Link to={`/channel/${datas?.snippet.channelId}`} >
                        <Avatar sx={{ width: "200px", height: "200px" }} src={datas?.snippet?.thumbnails?.high?.url} />
                    </Link>
                    <Box>
                        <Link to={`/channel/${datas?.snippet.channelId}`} >
                            <Typography variant='h5' color={"gray"} fontWeight={"bold"} mt={2} sx={{ textAlign: "center", flexWrap: "wrap" }} >
                                {replaceSymbols(datas.snippet.title)}
                            </Typography>
                        </Link>
                        <Typography variant='h5' color={"gray"} fontWeight={"bold"} mt={2} sx={{ padding: "20px", textAlign: "center", flexWrap: "wrap" }} >
                            {replaceSymbols(datas?.snippet?.description)}
                        </Typography>

                    </Box>

                </CardContent>

                <Typography mr={1} mb={1} sx={{ opacity: ".6", display: "flex", justifyContent: "flex-end" }}  >
                    Channel
                </Typography>
            </Stack >

        </>
    )
}
