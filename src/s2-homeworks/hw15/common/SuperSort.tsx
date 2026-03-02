import React from 'react'

export const pureChange = (
    sort: string,
    down: string,
    up: string
) => {
    switch (sort) {
        case down:
            return up
        case up:
            return ''
        default:
            return down
    }
}

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
    const up = '0' + value
    const down = '1' + value

    const handleClick = () => {
        onChange(pureChange(sort, down, up))
    }

    const icon =
        sort === down
            ? '▼'
            : sort === up
                ? '▲'
                : '↕️'

    return (
        <span
            id={id}
            onClick={handleClick}
            style={{ cursor: 'pointer', marginLeft: 6 }}
        >
            {icon}
        </span>
    )
}