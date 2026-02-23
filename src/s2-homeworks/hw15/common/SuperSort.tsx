import React from 'react'
import s from './SuperSort.module.css'

type SuperSortProps = {
    id?: string
    sort: string
    value: string
    onChange: (newSort: string) => void
}

export const SuperSort: React.FC<SuperSortProps> = ({
                                                        sort,
                                                        value,
                                                        onChange,
                                                        id
                                                    }) => {
    // Определяем направление сортировки для текущей колонки
    const isActive = sort.includes(value)
    const direction = isActive ? sort[0] : ''

    const handleClick = () => {
        // pureChange логика:
        // если сортировка не активна -> включаем сортировку по возрастанию (1'value')
        // если активна по возрастанию -> меняем на убывание (0'value')
        // если активна по убыванию -> отключаем сортировку ('')
        if (!isActive) {
            onChange(`1${value}`) // Включить сортировку по возрастанию
        } else if (direction === '1') {
            onChange(`0${value}`) // Поменять на убывание
        } else {
            onChange('') // Отключить сортировку
        }
    }

    return (
        <span
            id={id}
            className={`${s.sort} ${isActive ? s.active : ''}`}
            onClick={handleClick}
        >
            {value}
            {isActive && (
                <span className={s.icon}>
                    {direction === '1' ? '▲' : '▼'}
                </span>
            )}
        </span>
    )
}