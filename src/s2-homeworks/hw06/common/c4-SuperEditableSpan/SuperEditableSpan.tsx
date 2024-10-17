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

    const spanClassName = `${s.span} ${className ? className : ''}`

    return (
        <>
            {editMode ? (
                <SuperInputText
                    autoFocus={autoFocus || true}
                    onBlur={onBlurCallback}
                    onEnter={onEnterCallback}
                    value={value}
                    onChange={(e) => {
                        setValue(e.currentTarget.value)
                        restProps.onChange?.(e)
                    }}
                    className={s.input}
                    {...restProps}
                />
            ) : (
                <div className={s.spanBlock}>
                    <img src={editIcon} className={s.pen} alt="edit" />
                    <span
                        onDoubleClick={onDoubleClickCallBack}
                        className={spanClassName}
                        {...restSpanProps}
                    >
                        {children || value || defaultText}
                    </span>
                </div>
            )}
        </>
    )
}

export default SuperEditableSpan