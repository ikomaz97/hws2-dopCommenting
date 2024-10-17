import React, {
    DetailedHTMLProps,
    InputHTMLAttributes,
    HTMLAttributes,
    useState,
    useEffect,
} from 'react'
import s from './SuperEditableSpan.module.css'
import SuperInputText from '../../../hw04/common/c1-SuperInputText/SuperInputText'
import editIcon from './editIcon.svg'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
// тип пропсов обычного спана
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

// тип для нашего компонента
type SuperEditableSpanType = Omit<DefaultInputPropsType, 'type'> & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanProps?: DefaultSpanPropsType & { defaultText?: string }
}

const SuperEditableSpan: React.FC<SuperEditableSpanType> = ({
                                                                autoFocus,
                                                                onBlur,
                                                                onEnter,
                                                                spanProps,
                                                                ...restProps
                                                            }) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [value, setValue] = useState<string>(restProps.value as string || spanProps?.defaultText || '')

    const { children, onDoubleClick, className, defaultText, ...restSpanProps } = spanProps || {}

    // Восстанавливаем значение из localStorage при монтировании компонента
    useEffect(() => {
        const savedValue = localStorage.getItem('editableSpanText')
        if (savedValue) {
            setValue(savedValue)
        }
    }, [])

    const onEnterCallback = () => {
        setEditMode(false)
        onEnter?.()
    }

    const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
        setEditMode(false)
        onBlur?.(e)
    }

    const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setEditMode(true)
        onDoubleClick?.(e)
    }

    // Функция для сохранения значения в localStorage
    const saveToLocalStorage = () => {
        localStorage.setItem('editableSpanText', value)
    }

    // Функция для восстановления значения из localStorage
    const restoreFromLocalStorage = () => {
        const savedValue = localStorage.getItem('editableSpanText')
        if (savedValue) {
            setValue(savedValue)
        }
    }

    const spanClassName = `${s.span} ${className ? className : ''}`

    return (
        <div>
            {editMode ? (
                <SuperInputText
                    autoFocus={autoFocus || true}
                    onBlur={onBlurCallback}
                    onEnter={onEnterCallback}
                    value={value}
                    onChange={(e) => setValue(e.currentTarget.value)}
                    className={s.input}
                    {...restProps}
                />
            ) : (
                <div className={s.spanBlock}>
                    <img src={editIcon} className={s.pen} alt="edit" />
                    <span onDoubleClick={onDoubleClickCallBack} className={spanClassName} {...restSpanProps}>
                        {children || value || defaultText}
                    </span>
                </div>
            )}

            {/* Кнопки для сохранения и восстановления текста */}
            <div>
                <button onClick={saveToLocalStorage}>Save</button>
                <button onClick={restoreFromLocalStorage}>Restore</button>
            </div>
        </div>
    )
}

export default SuperEditableSpan