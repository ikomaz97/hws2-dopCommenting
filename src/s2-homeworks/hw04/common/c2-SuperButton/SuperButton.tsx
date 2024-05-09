import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import s from './SuperButton.module.css';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type SuperButtonPropsType = DefaultButtonPropsType & {
    xType?: 'КРАСНЫЙ' | 'secondary'; // Определяем тип xType как 'КРАСНЫЙ' или 'secondary'
};

const SuperButton: React.FC<SuperButtonPropsType> = ({
                                                         xType,
                                                         className,
                                                         disabled,
                                                         ...restProps
                                                     }) => {
    // Формируем строку классов finalClassName с использованием шаблонных строк
    const finalClassName = `${s.button} 
        ${xType === 'КРАСНЫЙ' ? s.red : xType === 'secondary' ? s.secondary : ''} 
        ${disabled ? s.disabled : ''}`.trim(); // Удаляем лишние пробелы

    return (
        <button
            disabled={disabled}
            className={finalClassName}
            {...restProps}
        />
    );
};

export default SuperButton;
