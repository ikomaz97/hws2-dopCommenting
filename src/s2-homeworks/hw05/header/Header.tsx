import React, { FC } from 'react'
import burgerIcon from './burger.svg'
import s from './Header.module.css'
import { useLocation } from 'react-router-dom'
import { PATH } from '../Pages'

type PropsType = {
    handleOpen: () => void
}

export const Header: FC<PropsType> = ({ handleOpen }) => {
    const location = useLocation()
    const currentPath = location.pathname

    const pageName =
        currentPath === PATH.PRE_JUNIOR
            ? 'Pre-junior'
            : currentPath === PATH.JUNIOR
                ? 'Junior'
                : currentPath === PATH.JUNIOR_PLUS
                    ? 'Junior Plus'
                    : 'Error'

    return (
        <>
            <header id="hw5-header" className={s.header} role="banner">
                <div className={s.headerContent}>
                    <button
                        id="hw5-burger-menu"
                        className={s.burgerMenuButton}
                        onClick={handleOpen}
                        aria-label="Открыть меню"
                        aria-expanded={false}
                        aria-controls="hw5-menu"
                    >
                        <img
                            src={burgerIcon}
                            className={s.burgerMenuIcon}
                            alt="Меню"
                        />
                    </button>
                    <h1>{pageName}</h1>
                </div>
            </header>
        </>
    )
}