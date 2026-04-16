import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import s from './Sidebar.module.css'
import { PATH } from '../Pages'
import closeIcon from './closeOutline.svg'

type PropsType = {
    open: boolean
    handleClose: () => void
}

export const Sidebar: FC<PropsType> = ({ open, handleClose }) => {
    const sidebarClass = s.sidebar + (open ? ' ' + s.open : '')

    const navItems = [
        { path: PATH.PRE_JUNIOR, label: 'Pre-junior', icon: '🏠' },
        { path: PATH.JUNIOR, label: 'Junior', icon: '🚀' },
        { path: PATH.JUNIOR_PLUS, label: 'Junior Plus', icon: '⭐' },
    ]

    return (
        <>
            {/* Затемнение справа от открытого меню */}
            {open && (
                <div
                    className={s.background}
                    onClick={handleClose}
                    aria-hidden="true"
                />
            )}

            <aside
                className={sidebarClass}
                id="hw5-menu"
                role="dialog"
                aria-label="Основное меню"
                aria-modal="true"
            >
                <button
                    className={s.close}
                    onClick={handleClose}
                    aria-label="Закрыть меню"
                >
                    <img src={closeIcon} alt="Закрыть" />
                </button>

                <nav className={s.nav}>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            id={`hw5-${item.path.replace('/', '-').replace('-', '')}-link`}
                            to={item.path}
                            onClick={handleClose}
                            className={({ isActive }) =>
                                isActive ? `${s.a} ${s.active}` : s.a
                            }
                            aria-current="page"
                        >
                            <span className={s.icon}>{item.icon}</span>
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    )
}