import React, { ChangeEvent } from 'react';
import s from './SuperInputText.module.css';

type SuperInputTextPropsType = {
    id?: string;
    value: string;
    onChangeText: (value: string) => void; // Используем onChangeText
    onEnter?: () => void;
    error?: string; // Исправляем тип ошибки на string
    spanClassName?: string;
}

const SuperInputText: React.FC<SuperInputTextPropsType> = ({
                                                               id,
                                                               value,
                                                               onChange,
                                                               onEnter,
                                                               error,
                                                               spanClassName,
                                                               ...restProps
                                                           }) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (onChange) {
            onChange(value);
        }
    };

    const onKeyPressCallback = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onEnter) {
            onEnter();
        }
    };

    const finalSpanClassName = s.error + (spanClassName ? ` ${spanClassName}` : '');
    const finalInputClassName = error ? `${s.input} ${s.errorInput}` : s.input;

    return (
        <div className={s.inputWrapper}>
            <input
                id={id}
                type="text"
                value={value}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={finalInputClassName}
                {...restProps}
            />
            {error && (
                <span id={id ? `${id}-span` : undefined} className={finalSpanClassName}>
                    {error}
                </span>
            )}
        </div>
    );
};

export default SuperInputText;