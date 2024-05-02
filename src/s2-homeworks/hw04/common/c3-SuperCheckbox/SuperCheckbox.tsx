import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import s from './SuperCheckbox.module.css';

// Тип пропсов обычного чекбокса
type DefaultCheckboxPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type SuperCheckboxPropsType = Omit<DefaultCheckboxPropsType, 'type'> & {
    onChangeChecked?: (checked: boolean) => void;
    spanClassName?: string;
};

const SuperCheckbox: React.FC<SuperCheckboxPropsType> = ({
                                                             onChange,
                                                             onChangeChecked,
                                                             className,
                                                             spanClassName,
                                                             children,
                                                             id,
                                                             ...restProps
                                                         }) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        // Проверяем наличие колбэка для изменения состояния чекбокса
        if (onChangeChecked) {
            onChangeChecked(e.currentTarget.checked); // Передаем значение checked
        }

        // Передаем событие onChange, если он существует
        if (onChange) {
            onChange(e);
        }
    };

    const finalInputClassName = `${s.checkbox} ${className || ''}`.trim();

    return (
        <label className={s.label}>
            <input
                id={id}
                type="checkbox"
                onChange={onChangeCallback}
                className={finalInputClassName}
                {...restProps}
            />
            {children && (
                <span id={id ? id + '-span' : undefined} className={s.spanClassName}>
                    {children}
                </span>
            )}
        </label>
    );
};

export default SuperCheckbox;