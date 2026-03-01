import React from 'react'
import { pureChange } from "../helpers/sortHelpers"

type Props = {
    id?: string
    sort: string
    value: string
    onChange: (newSort: string) => void
}

export const SuperSort: React.FC<Props> = ({
                                               sort,
                                               value,
                                               onChange,
                                               id
                                           }) => {
    const downSort = '0' + value
    const upSort = '1' + value

    const handleClick = () => {
        onChange(pureChange(sort, downSort))
    }

    const getIcon = () => {
        if (sort === downSort) return '▼'
        if (sort === upSort) return '▲'
        return '↕️'
    }

    return (
        <span
            id={id}
            onClick={handleClick}
            style={{
                cursor: 'pointer',
                marginLeft: 8,
                display: 'inline-block',
                minWidth: 20,
                textAlign: 'center'
            }}
        >
            {getIcon()}
        </span>
    )
}