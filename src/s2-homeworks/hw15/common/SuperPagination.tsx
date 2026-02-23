import React from 'react'
import s from './SuperPagination.module.css'

type SuperPaginationProps = {
    page: number
    itemsCountForPage: number
    totalCount: number
    onChange: (page: number, count: number) => void
}

export const SuperPagination: React.FC<SuperPaginationProps> = ({
                                                                    page,
                                                                    itemsCountForPage,
                                                                    totalCount,
                                                                    onChange
                                                                }) => {
    const totalPages = Math.ceil(totalCount / itemsCountForPage)

    // Создаем массив страниц для отображения
    const getPagesArray = () => {
        const pages = []
        const maxVisiblePages = 7

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            if (page <= 4) {
                for (let i = 1; i <= 5; i++) pages.push(i)
                pages.push('...')
                pages.push(totalPages)
            } else if (page >= totalPages - 3) {
                pages.push(1)
                pages.push('...')
                for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i)
            } else {
                pages.push(1)
                pages.push('...')
                for (let i = page - 1; i <= page + 1; i++) pages.push(i)
                pages.push('...')
                pages.push(totalPages)
            }
        }
        return pages
    }

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onChange(newPage, itemsCountForPage)
        }
    }

    const handleCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCount = Number(e.target.value)
        onChange(1, newCount) // Сбрасываем на первую страницу при изменении количества
    }

    return (
        <div className={s.pagination}>
            <div className={s.pages}>
                {getPagesArray().map((p, index) => (
                    <button
                        key={index}
                        className={`${s.pageButton} ${p === page ? s.active : ''} ${p === '...' ? s.dots : ''}`}
                        onClick={() => typeof p === 'number' && handlePageChange(p)}
                        disabled={p === '...'}
                    >
                        {p}
                    </button>
                ))}
            </div>

            <div className={s.showBlock}>
                <span className={s.showText}>Показать</span>
                <select
                    className={s.select}
                    value={itemsCountForPage}
                    onChange={handleCountChange}
                >
                    <option value="4">4</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
                <span className={s.showText}>строк в таблице</span>
            </div>
        </div>
    )
}