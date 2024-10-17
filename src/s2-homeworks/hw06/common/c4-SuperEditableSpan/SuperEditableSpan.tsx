import React, {
    DetailedHTMLProps,
    InputHTMLAttributes,
    HTMLAttributes,
    useState,
    ChangeEvent,
    useEffect,
} from 'react';
import s from './SuperEditableSpan.module.css';
import SuperInputText from '../../../hw04/common/c1-SuperInputText/SuperInputText';
import editIcon from './editIcon.svg';

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
// тип пропсов обычного спана
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

type SuperEditableSpanType = Omit<DefaultInputPropsType, 'type'> & {
    onChangeText?: (value: string) => void;
    onEnter?: () => void;
    error?: string;
    spanProps?: DefaultSpanPropsType & { defaultText?: string }; // пропсы для спана
};

const SuperEditableSpan: React.FC<SuperEditableSpanType> = ({
                                                                autoFocus,
                                                                onBlur,
                                                                onEnter,
                                                                onChangeText,
                                                                spanProps,
                                                                ...restProps
                                                            }) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [localValue, setLocalValue] = useState<string>(restProps.value as string || spanProps?.defaultText || ''); // локальное состояние для текста

    const { children, onDoubleClick, className, defaultText, ...restSpanProps } = spanProps || {};

    // Загружаем текст из localStorage при загрузке компонента
    useEffect(() => {
        const savedValue = localStorage.getItem('editableSpanText');
        if (savedValue) {
            setLocalValue(savedValue);
        }
    }, []);

    const onEnterCallback = () => {
        setEditMode(false); // выключаем режим редактирования при нажатии Enter
        onEnter?.(); // вызываем переданный проп onEnter, если он есть
        if (onChangeText) {
            onChangeText(localValue); // передаем текст вверх через проп onChangeText
        }
    };

    const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
        setEditMode(false); // выключаем режим редактирования при потере фокуса
        onBlur?.(e); // вызываем переданный проп onBlur, если он есть
        if (onChangeText) {
            onChangeText(localValue); // передаем текст вверх через проп onChangeText
        }
    };

    const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setEditMode(true); // включаем режим редактирования при двойном клике
        onDoubleClick?.(e); // вызываем переданный проп onDoubleClick, если он есть
    };

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value); // обновляем локальное состояние при изменении инпута
    };

    const saveToLocalStorage = () => {
        localStorage.setItem('editableSpanText', localValue); // сохраняем текущее значение в localStorage
    };

    const restoreFromLocalStorage = () => {
        const savedValue = localStorage.getItem('editableSpanText');
        if (savedValue) {
            setLocalValue(savedValue); // восстанавливаем значение из localStorage
        }
    };

    const spanClassName = s.span + (className ? ' ' + className : '');

    return (
        <div>
            {editMode ? (
                <SuperInputText
                    autoFocus={autoFocus || true}
                    onBlur={onBlurCallback}
                    onEnter={onEnterCallback}
                    value={localValue} // локальное состояние текста для инпута
                    onChange={onInputChange} // обновление локального состояния при вводе
                    className={s.input}
                    {...restProps} // отдаём инпуту остальные пропсы, если они есть
                />
            ) : (
                <div className={s.spanBlock}>
                    <img src={editIcon} className={s.pen} alt={'edit'} />
                    <span onDoubleClick={onDoubleClickCallBack} className={spanClassName} {...restSpanProps}>
                        {children || localValue || defaultText}
                    </span>
                </div>
            )}
            <div>
                <button onClick={saveToLocalStorage}>Save</button> {/* Кнопка для сохранения */}
                <button onClick={restoreFromLocalStorage}>Restore</button> {/* Кнопка для восстановления */}
            </div>
        </div>
    );
};

export default SuperEditableSpan;