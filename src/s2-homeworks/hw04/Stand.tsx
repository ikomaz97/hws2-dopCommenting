import React, { useState } from 'react';
import s from './Stand.module.css';
import SuperInputText from './common/c1-SuperInputText/SuperInputText';
import SuperCheckbox from './common/c3-SuperCheckbox/SuperCheckbox';
import SuperButton from './common/c2-SuperButton/SuperButton';

const Stand = () => {
    const [stateForAllInputs, setStateForAllInputs] = useState('');
    const [error, setError] = useState('');

    const [stateForAllCheckboxes, setStateForAllCheckboxes] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStateForAllInputs(e.target.value);
    };

    const handleInputWithEnter = () => {
        if (stateForAllInputs.trim() === '') {
            setError('Error');
        } else {
            setError('');
            setStateForAllInputs('');
        }
    };

    const handleCheckboxChange = (checked: boolean) => {
        setStateForAllCheckboxes(checked);
    };

    return (
        <div id="hw4-stand" className={s.stand}>
            <div className={s.inputs}>
                {/* Text input compatible with old code */}
                <div>
                    <SuperInputText
                        id={'hw4-super-input-like-old'}
                        value={stateForAllInputs}
                        onChange={handleInputChange}
                    />
                </div>
                {/* Text input with error handling */}
                <div>
                    <SuperInputText
                        id={'hw4-super-input-with-error'}
                        value={stateForAllInputs}
                        onChangeText={handleInputChange}
                        error={error}
                        onEnter={handleInputWithEnter}
                    />
                </div>
            </div>

            <div className={s.buttons}>
                {/* Default button */}
                <div>
                    <SuperButton id={'hw4-super-button-default'}>default</SuperButton>
                </div>
                {/* Red button */}
                <div>
                    <SuperButton id={'hw4-super-button-red'} xType="red">
                        red
                    </SuperButton>
                </div>
                {/* Disabled red button */}
                <div>
                    <SuperButton id={'hw4-super-button-disabled'} xType="red" disabled>
                        disabled
                    </SuperButton>
                </div>
                {/* Secondary button */}
                <div>
                    <SuperButton id={'hw4-super-button-secondary'} xType="secondary">
                        secondary
                    </SuperButton>
                </div>
            </div>

            <div className={s.checkboxes}>
                {/* Checkbox with text */}
                <div>
                    <SuperCheckbox
                        id={'hw4-super-checkbox-like-old'}
                        checked={stateForAllCheckboxes}
                        onChangeChecked={handleCheckboxChange}
                    >
                        some text
                    </SuperCheckbox>
                </div>
                {/* Checkbox compatible with old code */}
                <div>
                    <SuperCheckbox
                        id={'hw4-super-checkbox-like-old'}
                        checked={stateForAllCheckboxes}
                        onChange={(e) => handleCheckboxChange(e.currentTarget.checked)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Stand;