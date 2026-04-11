import React from 'react'

import styles from './SuperSort.module.css'
import {pureChange} from "../helpers/sortHelpers";

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
            className={styles.sort}
        >
            {value.charAt(0).toUpperCase() + value.slice(1)} {icon}
        </span>
    )
}