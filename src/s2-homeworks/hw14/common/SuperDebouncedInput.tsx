import React, { useState, useEffect, ChangeEvent } from 'react'
import s from './SuperDebouncedInput.module.css'

type SuperDebouncedInputProps = {
    onChangeText: (value: string) => void
    placeholder?: string
    delay?: number
}

export const SuperDebouncedInput: React.FC<SuperDebouncedInputProps> = ({
                                                                            onChangeText,
                                                                            placeholder,
                                                                            delay = 1000
                                                                        }) => {
    const [value, setValue] = useState('')

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onChangeText(value)
        }, delay)

        return () => clearTimeout(timeoutId)
    }, [value, delay, onChangeText])

    // Пункт 1 - функция onChangeTextCallback
    const onChangeTextCallback = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return (
        <input
            id="hw14-super-debounced-input"
            className={s.input}
            value={value}
            onChange={onChangeTextCallback}
            placeholder={placeholder}
            type="text"
        />
    )
}