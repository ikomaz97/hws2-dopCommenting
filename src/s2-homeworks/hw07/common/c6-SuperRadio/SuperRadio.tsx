import React, { ChangeEvent } from 'react';
import s from './SuperRadio.module.css';

type OptionType = { id: string | number; value: string };

type SuperRadioPropsType = {
    options?: OptionType[];
    onChangeOption?: (option: OptionType | null) => void;
    className?: string;
    value?: string | number;
    name?: string;
    id?: string; // Добавляем id
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    spanProps?: React.HTMLProps<HTMLSpanElement>;
};

const SuperRadio: React.FC<SuperRadioPropsType> = ({
                                                       id,
                                                       name,
                                                       className,
                                                       options,
                                                       value,
                                                       onChange,
                                                       onChangeOption,
                                                       spanProps,
                                                       ...restProps
                                                   }) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedValue = e.target.value;
        if (onChangeOption && options) {
            const selectedOption = options.find(
                (o) => String(o.id) === selectedValue
            );
            onChangeOption(selectedOption || null); // Передаем выбранный объект
        }
        if (onChange) onChange(e); // Вызываем стандартный onChange
    };

    const finalRadioClassName = s.radio + (className ? ' ' + className : '');
    const spanClassName =
        s.span + (spanProps?.className ? ' ' + spanProps.className : '');

    const mappedOptions = options
        ? options.map((o) => (
            <label key={name + '-' + o.id} className={s.label}>
                <input
                    id={id + '-input-' + o.id}
                    className={finalRadioClassName}
                    type="radio"
                    name={name} // Все радио-кнопки в группе должны иметь одинаковое name
                    value={o.id}
                    checked={o.id === value} // Отмечена ли эта кнопка
                    onChange={onChangeCallback}
                    {...restProps}
                />
                <span
                    id={id + '-span-' + o.id}
                    {...spanProps}
                    className={spanClassName}
                >
                    {o.value}
                </span>
            </label>
        ))
        : [];

    return <div className={s.options}>{mappedOptions}</div>;
};

export default SuperRadio;