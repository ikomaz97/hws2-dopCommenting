import React, { useState } from 'react';
import SuperEditableSpan from './common/c4-SuperEditableSpan/SuperEditableSpan';
import { restoreState, saveState } from './localStorage/localStorage';
import s2 from '../../s1-main/App.module.css';
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton';
import s from './HW6.module.css';

const HW6 = () => {
    // Инициализация value из localStorage
    const [value, setValue] = useState<string>(() => restoreState<string>('hw6-editable-span-value', ''));

    const save = () => {
        saveState<string>('hw6-editable-span-value', value); // Сохраняем значение в localStorage
    };

    const restore = () => {
        const restoredValue = restoreState<string>('hw6-editable-span-value', ''); // Восстанавливаем значение
        setValue(restoredValue); // Обновляем состояние компонента
    };

    return (
        <div id={'hw6'}>
            <div className={s2.hwTitle}>Homework #6</div>

            <div className={s2.hw}>
                <div className={s.editableSpanContainer}>
                    <SuperEditableSpan
                        id={'hw6-spanable-input'}
                        value={value} // Привязка к состоянию value
                        onChangeText={setValue} // Обновляем состояние при изменении текста
                        spanProps={{
                            id: 'hw6-editable-span',
                            defaultText: 'enter text...', // Значение по умолчанию
                        }}
                    />
                </div>

                <div className={s.buttonsContainer}>
                    <SuperButton id={'hw6-save'} onClick={save}>
                        Save to ls
                    </SuperButton>
                    <SuperButton
                        id={'hw6-restore'}
                        onClick={restore}
                        xType={'secondary'}
                    >
                        Get from ls
                    </SuperButton>
                </div>
            </div>
        </div>
    );
};

export default HW6;