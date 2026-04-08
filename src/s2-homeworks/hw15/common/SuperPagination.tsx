import React from 'react'
import styles from './SuperPagination.module.css'

type Props = {
    page: number
    itemsCountForPage: number
    totalCount: number
    onChange: (page: number, count: number) => void
}

export const SuperPagination: React.FC<Props> = ({
                                                     page,
                                                     itemsCountForPage,
                                                     totalCount,
                                                     onChange
                                                 }) => {
    const totalPages = Math.max(1, Math.ceil(totalCount / itemsCountForPage))
    const visiblePages = getVisiblePages(page, totalPages)

    return (
        <div className={styles.pagination}>
            <div className={styles.pages}>
                {visiblePages.map(p => {
                    // Render «…» marker
                    if (p === 'dots') {
                        return (
                            <button
                                key="dots"
                                className={`${styles.pageButton} ${styles.dots}`}
                                disabled
                            >
                                ...
                            </button>
                        )
                    }
                    // p is guaranteed to be a number here
                    return (
                        <button
                            key={p}
                            className={`${styles.pageButton} ${p === page ? styles.active : ''}`}
                            onClick={() => onChange(p as number, itemsCountForPage)}
                        >
                            {p}
                        </button>
                    )

                })}
            </div>

            <div className={styles.showBlock}>
                <select
                    className={styles.select}
                    value={itemsCountForPage}
                    onChange={e => onChange(1, Number(e.target.value))}
                >
                    <option value="4">4</option>
                    <option value="7">7</option>
                    <option value="10">10</option>
                </select>
                <span className={styles.showText}> строк в таблице</span>
            </div>
        </div>
    )
}

function getVisiblePages(currentPage: number, totalPages: number): (number | string)[] {
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages: (number | string)[] = []

    // Always show first page
    pages.push(1)

    if (currentPage > 3) {
        pages.push('dots')
    }

    // Show pages around current page
    const startPage = Math.max(2, currentPage - 1)
    const endPage = Math.min(totalPages - 1, currentPage + 1)

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
    }

    if (currentPage < totalPages - 2) {
        pages.push('dots')
    }

    // Always show last page
    pages.push(totalPages)

    return pages
}