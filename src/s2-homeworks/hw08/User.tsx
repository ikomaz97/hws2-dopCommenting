import React from 'react';
import { UserType } from './HW8';
import s from './HW8.module.css';

// types
type UserPropsType = {
    u: UserType;
}

const User: React.FC<UserPropsType> = ({ u }) => {
    const { _id, name, age } = u;

    return (
        <tr id={`hw8-user-${_id}-${age}`} className={s.item}>
            <td id={`hw8-user-name-${_id}`} className={s.nameCol}>
                {name} {/* Отображаем имя */}
            </td>
            <td id={`hw8-user-age-${_id}`} className={s.ageCol}>
                {age} {/* Отображаем возраст */}
            </td>
        </tr>
    );
}

export default User;