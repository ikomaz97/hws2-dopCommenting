import React, {
    ChangeEvent,
    InputHTMLAttributes,
    DetailedHTMLProps,
    HTMLAttributes,
} from 'react'
import s from './SuperRadio.module.css'

type DefaultRadioPropsType = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>
// тип пропсов обычного спана
type DefaultSpanPropsType = DetailedHTMLProps<
    HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
>

type SuperRadioPropsType = Omit<DefaultRadioPropsType, 'type'> & {
    options?: any[]
    onChangeOption?: (option: any) => void

    spanProps?: DefaultSpanPropsType // пропсы для спана
}

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
        const selectedValue = e.target.value; // Получаем значение выбранной радио-кнопки
        if (onChangeOption && options) {
            const selectedOption = options.find(o => o.id.toString() === selectedValue); // Ищем выбранный объект
            onChangeOption(selectedOption); // Вызываем кастомный обработчик с выбранным объектом
        }
        if (onChange) {
            onChange(e); // Вызываем стандартный onChange
        }
    };

    const finalRadioClassName = s.radio + (className ? ' ' + className : '')
    const spanClassName = s.span + (spanProps?.className ? ' ' + spanProps.className : '')

    const mappedOptions: any[] = options
        ? options.map((o) => (
            <label key={name + '-' + o.id} className={s.label}>
                <input
                    id={id + '-input-' + o.id}
                    className={finalRadioClassName}
                    type={'radio'}
                    name={name} // Все кнопки в группе должны иметь одинаковый name
                    value={o.id} // Значение этой кнопки
                    checked={o.id === value} // Отмечена ли эта кнопка
                    onChange={onChangeCallback} // Обработчик события
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

    return <div className={s.options}>{mappedOptions}</div>
}

export default SuperRadio
