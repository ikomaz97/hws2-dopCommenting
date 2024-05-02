import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import s from './SuperButton.module.css';

// Определяем тип пропсов для обычной кнопки
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

// Добавляем новые пропсы для SuperButton и комбинируем их с пропсами обычной кнопки
type SuperButtonPropsType = DefaultButtonPropsType & {
    xType?: 'red' | 'secondary'; // Тип xType может быть 'red' или 'secondary'
};

const SuperButton: React.FC<SuperButtonPropsType> = ({
                                                         xType,
                                                         className,
                                                         disabled,
                                                         children,
                                                         ...restProps // Оставшиеся пропсы
                                                     }) => {
    // Формируем классы для стилизации кнопки
    const finalClassName = `${s.button} ${xType === 'red' ? s.red : xType === 'secondary' ? s.secondary : ''} ${className || ''}`;

    return (
        <button
            className={finalClassName.trim()} // Убираем лишние пробелы
            disabled={disabled}
            {...restProps}
        >
            {children}
        </button>
    );
};

export default SuperButton;