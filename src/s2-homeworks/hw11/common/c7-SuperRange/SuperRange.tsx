import React from 'react'
import { Slider, SliderProps } from '@mui/material'

const SuperRange: React.FC<SliderProps> = (props) => {
    return (
        <Slider
            sx={{
                color: '#1976d2', // основной цвет
                height: 6,
                '& .MuiSlider-thumb': {
                    height: 20,
                    width: 20,
                    backgroundColor: '#fff',
                    border: '2px solid currentColor',
                    '&:hover': {
                        boxShadow: '0 0 0 8px rgba(25, 118, 210, 0.16)',
                    },
                    '&.Mui-active': {
                        boxShadow: '0 0 0 14px rgba(25, 118, 210, 0.16)',
                    },
                },
                '& .MuiSlider-track': {
                    border: 'none',
                },
                '& .MuiSlider-rail': {
                    opacity: 0.5,
                    backgroundColor: '#bfbfbf',
                },
            }}
            {...props}
        />
    )
}

export default SuperRange