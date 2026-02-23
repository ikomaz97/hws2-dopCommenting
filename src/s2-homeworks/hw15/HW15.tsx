import React, { useState, useCallback, useEffect } from 'react'
import { SuperPagination } from './common/SuperPagination'
import { SuperSort } from './common/SuperSort'
import s from './HW15.module.css'

// Генерация тестовых данных
const generateTechData = () => {
    const techs = ['html', 'css', 'scss', 'javascript', 'typescript', 'react', 'redux', 'jest']
    const developers = ['Developer 1', 'Developer 2', 'Developer 3', 'Developer 4', 'Developer 5', 'Developer 6']
    const data = []

    for (let i = 1; i <= 50; i++) {
        data.push({
            id: i,
            tech: techs[Math.floor(Math.random() * techs.length)],
            developer: developers[Math.floor(Math.random() * developers.length)]
        })
    }
    return data
}

const allData = generateTechData()

export const HW15 = () => {
    const [data, setData] = useState(allData)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(4)
    const [sort, setSort] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [displayedData, setDisplayedData] = useState(data.slice(0, itemsPerPage))

    // Функция сортировки
    const sortData = (data: any[], sortBy: string) => {
        if (!sortBy) return data

        const direction = sortBy[0]
        const field = sortBy.substring(1) as 'tech' | 'developer'

        return [...data].sort((a, b) => {
            if (direction === '1') {
                return a[field] > b[field] ? 1 : -1
            } else {
                return a[field] < b[field] ? 1 : -1
            }
        })
    }

    // Пункт 3 - функция sendQuery
    const sendQuery = useCallback(async (page: number, count: number, sortBy: string) => {
        setIsLoading(true)

        // Имитация запроса к серверу
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Сортируем данные
        const sortedData = sortData(allData, sortBy)

        // Пагинация
        const start = (page - 1) * count
        const end = start + count
        const paginatedData = sortedData.slice(start, end)

        setData(sortedData)
        setDisplayedData(paginatedData)
        setIsLoading(false)
    }, [])

    // Пункт 3 - функция onChangePagination
    const onChangePagination = useCallback((page: number, count: number) => {
        setCurrentPage(page)
        setItemsPerPage(count)
        sendQuery(page, count, sort)
    }, [sort, sendQuery])

    // Пункт 3 - функция onChangeSort
    const onChangeSort = useCallback((newSort: string) => {
        setSort(newSort)
        setCurrentPage(1) // Сбрасываем на первую страницу
        sendQuery(1, itemsPerPage, newSort)
    }, [itemsPerPage, sendQuery])

    // Загрузка при монтировании
    useEffect(() => {
        sendQuery(currentPage, itemsPerPage, sort)
    }, [])

    return (
        <div className={s.container}>
            <h2 className={s.title} id="hw15-title">Hometask № 15</h2>

            {isLoading && (
                <div className={s.loadingOverlay}>
                    <div className={s.spinner}></div>
                </div>
            )}

            <div className={s.content}>
                <SuperPagination
                    page={currentPage}
                    itemsCountForPage={itemsPerPage}
                    totalCount={allData.length}
                    onChange={onChangePagination}
                />

                <table className={s.table}>
                    <thead>
                    <tr>
                        <th>
                            <SuperSort
                                id="hw15-sort-tech"
                                sort={sort}
                                value="tech"
                                onChange={onChangeSort}
                            />
                        </th>
                        <th>
                            <SuperSort
                                id="hw15-sort-developer"
                                sort={sort}
                                value="developer"
                                onChange={onChangeSort}
                            />
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayedData.map((item, index) => (
                        <tr key={item.id} id={`hw15-tech-${index}`}>
                            <td>{item.tech}</td>
                            <td>{item.developer}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}