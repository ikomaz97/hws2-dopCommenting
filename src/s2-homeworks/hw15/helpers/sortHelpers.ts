// Функция для тестирования pureChange
export const pureChange = (sort: string, downSort: string) => {
    // если сортировка не активна
    if (sort === '') {
        return downSort // включаем сортировку по убыванию
    }

    // если активна сортировка по убыванию для этой колонки
    if (sort === downSort) {
        return `1${downSort.substring(1)}` // меняем на возрастание
    }

    // если активна сортировка по возрастанию для этой колонки
    if (sort === `1${downSort.substring(1)}`) {
        return '' // отключаем сортировку
    }

    // если активна сортировка для другой колонки
    return downSort // включаем сортировку по убыванию для новой колонки
}