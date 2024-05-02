import React, { ChangeEvent, KeyboardEvent } from 'react';
import s from './SuperInputText.module.css';

type SuperInputTextProps = {
    value: string;
    onChange: (value: string) => void;
    onChangeText?: (value: string) => void;
    onEnter?: () => void;
    error?: React.ReactNode;
    spanClassName?: string;
    className?: string;
    id?: string;
    // Другие пропсы для <input>, такие как placeholder, disabled и т.д.
    // Для примера оставим только некоторые из них
    placeholder?: string;
    disabled?: boolean;
};

const SuperInputText: React.FC<SuperInputTextProps> = ({
                                                           value,
                                                           onChange,
                                                           onChangeText,
                                                           onEnter,
                                                           error,
                                                           spanClassName,
                                                           className,
                                                           id,
                                                           placeholder,
                                                           disabled,
                                                       }) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.value);
        onChangeText?.(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onEnter) {
            onEnter();
        }
    };

    const finalSpanClassName = s.error + (spanClassName ? ` ${spanClassName}` : '');
    const finalInputClassName = s.input + (error ? ` ${s.errorInput}` : '') + (className ? ` ${className}` : '');

    return (
        <div className={s.inputWrapper}>
            <input
                id={id}
                type="text"
                value={value}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                placeholder={placeholder}
                disabled={disabled}
                className={finalInputClassName}
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