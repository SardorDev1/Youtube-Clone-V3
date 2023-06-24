import { Box, Stack } from '@mui/material'
import React from 'react'
import { VideoCard, ChannelCard } from '../'
import Loader from '../constants/Loader'

export default function Contents({ videos}) {
  if (!videos.length) return <Loader />


  return (

    <>
      <Stack width={"100%"} direction={"row"} flexWrap={"wrap"} justifyContent={"center"} alignItems={"center"} gap={2}  >
        {videos.map(item => (
          <Box key={item.id.videoId} >
            {item.id.videoId && <VideoCard videos={item} />}
            {item.id.channelId && <ChannelCard datas={item} />}

          </Box>
        ))}

      </Stack>




    </>
  )
}
