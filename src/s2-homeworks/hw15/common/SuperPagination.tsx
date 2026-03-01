import React from 'react'

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
    const totalPages = Math.ceil(totalCount / itemsCountForPage)

    return (
        <div id="hw15-pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                    key={p}
                    onClick={() => onChange(p, itemsCountForPage)}
                    style={{ fontWeight: p === page ? 'bold' : 'normal' }}
                >
                    {p}
                </button>
            ))}

            <select
                id="hw15-pagination-select"
                value={itemsCountForPage}
                onChange={e => onChange(1, Number(e.target.value))}
            >
                <option value="4">4</option>
                <option value="7">7</option>
                <option value="10">10</option>
            </select>

            <span>строк в таблице</span>
        </div>
    )
}