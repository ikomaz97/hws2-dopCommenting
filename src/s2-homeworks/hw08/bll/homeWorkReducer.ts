import { UserType } from '../HW8'

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => {
    switch (action.type) {
        case 'sort': { // Сортировка по имени
            const sortedState = [...state]
            sortedState.sort((a, b) => {
                if (action.payload === 'up') {
                    return a.name.localeCompare(b.name) // по алфавиту
                } else {
                    return b.name.localeCompare(a.name) // по убыванию
                }
            })
            return sortedState
        }
        case 'check': { // Фильтрация по возрасту
            const filteredState = state.filter(u => u.age >= action.payload)
            return filteredState
        }
        default:
            return state
    }
}