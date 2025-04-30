import React from 'react';
import s from './Loader.module.css'; // подключаем стили

export const Loader = () => {
    return (
        <div className={s.loader}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                fill="none"
                stroke="#3498db"
            >
                <circle cx="25" cy="25" r="20" strokeWidth="5" stroke="#f3f3f3" />
                <path
                    d="M25 5a20 20 0 1 1 0 40"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="5"
                />
            </svg>
        </div>
    );
}