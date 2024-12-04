import React, {
    ChangeEvent,
    InputHTMLAttributes,
    DetailedHTMLProps,
    HTMLAttributes,
} from 'react';
import s from './SuperRadio.module.css';

type OptionType = { id: string | number; value: string };

type DefaultRadioPropsType = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

type DefaultSpanPropsType = DetailedHTMLProps<
    HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
>;

type SuperRadioPropsType = Omit<DefaultRadioPropsType, 'type'> & {
    options?: OptionType[];
    onChangeOption?: (option: OptionType | null) => void; // Изменено для поддержки null
    spanProps?: DefaultSpanPropsType;
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
            const selectedOption = options.find((o: OptionType) => String(o.id) === selectedValue);
            onChangeOption(selectedOption || null);
        }
        if (onChange) onChange(e);
    };

    const finalRadioClassName = s.radio + (className ? ' ' + className : '');
    const spanClassName = s.span + (spanProps?.className ? ' ' + spanProps.className : '');

    const mappedOptions: React.ReactNode = options
        ? options.map((o: OptionType) => (
            <label key={name + '-' + o.id} className={s.label}>
                <input
                    id={id + '-input-' + o.id}
                    className={finalRadioClassName}
                    type="radio"
                    name={name}
                    value={o.id}
                    checked={o.id === value}
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