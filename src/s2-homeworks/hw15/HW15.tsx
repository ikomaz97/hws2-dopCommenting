import React, { useState } from 'react'
import { SuperPagination } from './common/SuperPagination'
import { SuperSort } from './common/SuperSort'

const techs = [
    { id: 1, tech: 'html', developer: 'developer1' },
    { id: 2, tech: 'css', developer: 'developer1' },
    { id: 3, tech: 'javascript', developer: 'developer1' },
    { id: 4, tech: 'typescript', developer: 'developer1' },
    { id: 5, tech: 'scss', developer: 'developer1' },
    { id: 6, tech: 'jest', developer: 'developer1' },

    { id: 7, tech: 'html', developer: 'developer2' },
    { id: 8, tech: 'css', developer: 'developer2' },
    { id: 9, tech: 'javascript', developer: 'developer2' },
    { id: 10, tech: 'typescript', developer: 'developer2' },
    { id: 11, tech: 'scss', developer: 'developer2' },
    { id: 12, tech: 'jest', developer: 'developer2' },

    { id: 13, tech: 'html', developer: 'developer3' },
    { id: 14, tech: 'css', developer: 'developer3' },
    { id: 15, tech: 'javascript', developer: 'developer3' },
    { id: 16, tech: 'typescript', developer: 'developer3' },
    { id: 17, tech: 'scss', developer: 'developer3' },
    { id: 18, tech: 'jest', developer: 'developer3' },

    { id: 19, tech: 'html', developer: 'developer4' },
    { id: 20, tech: 'css', developer: 'developer4' },
    { id: 21, tech: 'javascript', developer: 'developer4' },
    { id: 22, tech: 'typescript', developer: 'developer4' },
    { id: 23, tech: 'scss', developer: 'developer4' },
    { id: 24, tech: 'jest', developer: 'developer4' },

    { id: 25, tech: 'html', developer: 'developer5' },
    { id: 26, tech: 'css', developer: 'developer5' },
    { id: 27, tech: 'javascript', developer: 'developer5' },
    { id: 28, tech: 'typescript', developer: 'developer5' },
    { id: 29, tech: 'scss', developer: 'developer5' },
    { id: 30, tech: 'jest', developer: 'developer5' },

    { id: 31, tech: 'html', developer: 'developer6' },
    { id: 32, tech: 'css', developer: 'developer6' },
    { id: 33, tech: 'javascript', developer: 'developer6' },
    { id: 34, tech: 'typescript', developer: 'developer6' },
    { id: 35, tech: 'scss', developer: 'developer6' },
    { id: 36, tech: 'jest', developer: 'developer6' },

    { id: 37, tech: 'html', developer: 'developer7' },
    { id: 38, tech: 'css', developer: 'developer7' },
    { id: 39, tech: 'javascript', developer: 'developer7' },
    { id: 40, tech: 'typescript', developer: 'developer7' },
    { id: 41, tech: 'scss', developer: 'developer7' },
    { id: 42, tech: 'jest', developer: 'developer7' },
]

export const HW15 = () => {
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(4)
    const [sort, setSort] = useState('')
    const [isLoading] = useState(false)

    // ✅ SORT FIRST
    const getSortedData = () => {
        if (!sort) return [...techs]

        const direction = sort[0] // '1' asc | '0' desc
        const field = sort.substring(1) as 'tech' | 'developer'

        return [...techs].sort((a, b) => {
            const result = a[field].localeCompare(
                b[field],
                undefined,
                { numeric: true }
            )

            return direction === '1' ? result : -result
        })
    }

    const sortedData = getSortedData()

    // ✅ THEN PAGINATION
    const currentData = sortedData.slice(
        (page - 1) * count,
        page * count
    )

    const onChangePagination = (newPage: number, newCount: number) => {
        setPage(newPage)
        setCount(newCount)
    }

    const onChangeSort = (newSort: string) => {
        setSort(newSort)
        setPage(1)
    }

    return (
        <div>
            <h2>Hometask № 15</h2>

            {isLoading && <div id="hw15-loading">loading...</div>}

            <SuperPagination
                page={page}
                itemsCountForPage={count}
                totalCount={techs.length}
                onChange={onChangePagination}
            />

            <table>
                <thead>
                <tr>
                    <th>
                        Tech
                        <SuperSort
                            id="hw15-sort-tech"
                            sort={sort}
                            value="tech"
                            onChange={onChangeSort}
                        />
                    </th>
                    <th>
                        Developer
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
                {currentData.map(item => (
                    <tr key={item.id}>
                        {/* ✅ ВАЖНО: id = item.id */}
                        <td id={`hw15-tech-${item.id}`}>
                            {item.tech}
                        </td>
                        <td id={`hw15-developer-${item.id}`}>
                            {item.developer}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}