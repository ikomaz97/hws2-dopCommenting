import React, { SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent } from 'react';
import s from './SuperSelect.module.css';

type OptionType = { id: string | number; value: string };

type DefaultSelectPropsType = DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
>;

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: OptionType[];
    onChangeOption?: (option: OptionType | null) => void;
};

const SuperSelect: React.FC<SuperSelectPropsType> = ({
                                                         options,
                                                         className,
                                                         onChange,
                                                         onChangeOption,
                                                         ...restProps
                                                     }) => {
    const mappedOptions: React.ReactNode = options
        ? options.map((o: OptionType) => (
            <option
                id={'hw7-option-' + o.id}
                className={s.option}
                key={o.id}
                value={o.id}
            >
                {o.value}
            </option>
        ))
        : [];

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        if (onChangeOption && options) {
            const selectedOption = options.find((o: OptionType) => String(o.id) === selectedValue);
            onChangeOption(selectedOption || null);
        }
        if (onChange) onChange(e);
    };

    const finalSelectClassName = s.select + (className ? ' ' + className : '');

    return (
        <select
            className={finalSelectClassName}
            onChange={onChangeCallback}
            {...restProps}
        >
            {mappedOptions}
        </select>
    );
};

export default SuperSelect;