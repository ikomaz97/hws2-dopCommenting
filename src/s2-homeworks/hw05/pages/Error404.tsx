import React from 'react'
import { useNavigate } from 'react-router-dom'
import s from './Error404.module.css'
import error404 from './404.svg'

const Error404 = () => {
    const navigate = useNavigate()

    const handleGoHome = () => {
        navigate('/pre-junior')
    }

    return (
        <div id="hw5-page-404" role="alert" aria-live="polite">
            <div className={s.wrapper}>
                <div className={s.card}>
                    <img src={error404} alt="404 - Страница не найдена" className={s.error404} />
                    <h2 className={s.title}>404</h2>
                    <p className={s.description}>Страница не найдена</p>
                    <p className={s.subdescription}>
                        Извините, страница, которую вы ищете, не существует. Возможно, она была перемещена или удалена.
                    </p>
                    <button onClick={handleGoHome} className={s.btn}>
                        На главную
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Error404