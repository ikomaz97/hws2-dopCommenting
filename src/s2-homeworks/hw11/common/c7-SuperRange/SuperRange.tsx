import React from 'react'
import {Slider, SliderProps} from '@mui/material'

const SuperRange: React.FC<SliderProps> = (props) => {
    return (
        <Slider
            sx={{
                width: 800,
                color: '#00CC22',
                '& .MuiSlider-thumb': {
                    height: 24,
                    width: 24,
                    backgroundColor: '#fff',
                    border: '2px solid currentColor',
                },
                '& .MuiSlider-track': {
                    height: 6,
                },
                '& .MuiSlider-rail': {
                    color: '#8B8B8B',
                    opacity: 1,
                    height: 6,
                },
            }} // стили для слайдера // пишет студент
                

            {...props} // отдаём слайдеру пропсы если они есть (value например там внутри)
        />
    )
}

export default SuperRange
