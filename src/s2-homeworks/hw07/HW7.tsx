import React, { useState } from 'react'
import SuperSelect from './common/c5-SuperSelect/SuperSelect'
import SuperRadio from './common/c6-SuperRadio/SuperRadio'
import s2 from '../../s1-main/App.module.css'
import s from './HW7.module.css'

// Определение типа OptionType
type OptionType = { id: string | number; value: string };

// Массив с опциями
const arr: OptionType[] = [
    { id: 1, value: 'x' },
    { id: 2, value: 'y' },
    { id: 3, value: 'z' },
];

// Компонент HW7
const HW7 = () => {
    const [value, onChangeOption] = useState<OptionType | null>(arr[0]); // Начальное значение для селекта и радио

    return (
        <div id="hw7">
            <div className={s2.hwTitle}>Homework #7</div> {/* Используем стили из App.module.css */}

            {/* Демонстрация компонент: */}
            <div className={s2.hw}>
                <div className={s.container}> {/* Используем стили из HW7.module.css */}
                    <div>
                        <SuperSelect
                            id="hw7-super-select" // Добавляем id
                            options={arr}
                            value={value?.id} // Значение должно быть id
                            onChangeOption={(option) => onChangeOption(option)} // Передаем обработчик
                        />
                    </div>
                    <div>
                        <SuperRadio
                            id="hw7-super-radio" // Добавляем id
                            name="hw7-radio"
                            options={arr}
                            value={value?.id} // Значение должно быть id
                            onChangeOption={(option) => onChangeOption(option)} // Передаем обработчик
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HW7;