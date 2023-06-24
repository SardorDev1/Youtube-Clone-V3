import React, { useState } from 'react'
import { category } from '../constants/Category'
import { CardActionArea, Stack, colors } from '@mui/material'
import { Colors } from '../constants/Colors'

export default function Category({ SelectedCategoryHandler, SelectedCategory }) {
    const [categoryname, setCategoryName] = useState(category.name)



    return (
        <>
            <Stack direction={'row'} sx={{ overflowX: "scroll" }} >


                {category.map(item => (

                    <button style={{ boxShadow: item.name === SelectedCategory && "0px 0px 5px black" }} onClick={() => SelectedCategoryHandler(item.name)} key={item.name} className='btnCategory' >
                        <span style={{ marginRight: "15px", }} >{item.Icon}</span>
                        <span >{item.name}</span>
                    </button>

                ))}
            </Stack><hr />
        </>
    )
}
