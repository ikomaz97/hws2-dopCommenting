import React, { useState, useEffect } from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import { restoreState } from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'

function Clock() {
    const [timerId, setTimerId] = useState<number | null>(null)
    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
    const [show, setShow] = useState<boolean>(false)

    // Функции форматирования даты и времени
    const formatTime = (date: Date) => date.toLocaleTimeString('en-GB', { hour12: false }) // HH:mm:ss
    const formatDate = (date: Date) => date.toLocaleDateString('ru-RU'); // dd.MM.yyyy
    const formatDay = (date: Date) => date.toLocaleString('en-GB', { weekday: 'long' }) // День недели
    const formatMonth = (date: Date) => date.toLocaleString('en-GB', { month: 'long' }) // Название месяца

    // Функция запуска таймера
    const start = () => {
        if (!timerId) { // Если таймер не запущен
            const id = window.setInterval(() => {
                setDate(new Date()) // Обновляем дату каждую секунду
            }, 1000)
            setTimerId(id) // Сохраняем id таймера
        }
    }

    // Функция остановки таймера
    const stop = () => {
        if (timerId) {
            clearInterval(timerId) // Останавливаем таймер
            setTimerId(null) // Обнуляем id таймера
        }
    }

    // Функции для показа и скрытия даты при наведении
    const onMouseEnter = () => setShow(true)
    const onMouseLeave = () => setShow(false)

    // Чистка таймера при размонтировании
    useEffect(() => {
        return () => {
            if (timerId) clearInterval(timerId)
        }
    }, [timerId])

    return (
        <div className={s.clock}>
            <div
                id={'hw9-watch'}
                className={s.watch}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span id={'hw9-day'}>{formatDay(date)}</span>,{' '}
                <span id={'hw9-time'}>
                    <strong>{formatTime(date)}</strong>
                </span>
            </div>

            <div id={'hw9-more'}>
                <div className={s.more}>
                    {show ? (
                        <>
                            <span id={'hw9-month'}>{formatMonth(date)}</span>,{' '}
                            <span id={'hw9-date'}>{formatDate(date)}</span>
                        </>
                    ) : (
                        <><br/></>
                    )}
                </div>
            </div>

            <div className={s.buttonsContainer}>
                <SuperButton
                    id={'hw9-button-start'}
                    disabled={!!timerId} // Блокируем, если таймер уже запущен
                    onClick={start}
                >
                    start
                </SuperButton>
                <SuperButton
                    id={'hw9-button-stop'}
                    disabled={!timerId} // Блокируем, если таймер не запущен
                    onClick={stop}
                >
                    stop
                </SuperButton>
            </div>
        </div>
    )
}

export default Clock