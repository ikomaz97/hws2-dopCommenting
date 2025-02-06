import React, { useState, useEffect } from 'react';
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton';
import { restoreState } from '../hw06/localStorage/localStorage';
import s from './Clock.module.css';

function Clock() {
    const [timerId, setTimerId] = useState<number | undefined>(undefined);
    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())));
    const [show, setShow] = useState<boolean>(false);

    const start = () => {
        if (timerId !== undefined) return;
        const id = window.setInterval(() => {
            setDate(new Date());
        }, 1000);
        setTimerId(id);
    };

    const stop = () => {
        if (timerId !== undefined) {
            clearInterval(timerId);
            setTimerId(undefined);
        }
    };

    const onMouseEnter = () => {
        setShow(true);
    };

    const onMouseLeave = () => {
        setShow(false);
    };

    useEffect(() => {
        return () => {
            if (timerId !== undefined) {
                clearInterval(timerId);
            }
        };
    }, [timerId]);

    const stringTime = date.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const stringDate = `${day}.${month}.${year}`;

    const stringDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
    const stringMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

    return (
        <div className={s.clock}>
            <div
                id={'hw9-watch'}
                className={s.watch}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span id={'hw9-day'}>{stringDay}</span>,{' '}
                <span id={'hw9-time'}>
                    <strong>{stringTime}</strong>
                </span>
            </div>

            <div id={'hw9-more'}>
                <div className={s.more}>
                    {show ? (
                        <>
                            <span id={'hw9-month'}>{stringMonth}</span>,{' '}
                            <span id={'hw9-date'}>{stringDate}</span>
                        </>
                    ) : (
                        <>
                            <br />
                        </>
                    )}
                </div>
            </div>

            <div className={s.buttonsContainer}>
                <SuperButton
                    id={'hw9-button-start'}
                    disabled={timerId !== undefined}
                    onClick={start}
                >
                    start
                </SuperButton>
                <SuperButton
                    id={'hw9-button-stop'}
                    disabled={timerId === undefined}
                    onClick={stop}
                >
                    stop
                </SuperButton>
            </div>
        </div>
    );
}

export default Clock;