import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { SuperPagination } from './common/SuperPagination'
import { SuperSort } from './common/SuperSort'

type TechType = {
    id: number
    tech: string
    developer: string
}

type ParamsType = {
    sort: string
    page: number
    count: number
}

const getTechs = (params: ParamsType) => {
    return axios.get<{ techs: TechType[]; totalCount: number }>(
        'https://samurai.it-incubator.io/api/3.0/homework/test3',
        { params }
    )
}

export const HW15 = () => {
    const [techs, setTechs] = useState<TechType[]>([])
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(4)
    const [sort, setSort] = useState('')
    const [totalCount, setTotalCount] = useState(0)
    const [loading, setLoading] = useState(false)

    const sendQuery = (params: ParamsType) => {
        setLoading(true)

        getTechs(params)
            .then(res => {
                setTechs(res.data.techs)
                setTotalCount(res.data.totalCount)
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        sendQuery({ page, count, sort })
    }, [page, count, sort])

    const onChangePagination = (newPage: number, newCount: number) => {
        setPage(newPage)
        setCount(newCount)
    }

    const onChangeSort = (newSort: string) => {
        setSort(newSort)
        setPage(1)
    }

    return (
        <div id="hw15">
            <h2>Homework №15</h2>

            {loading && <div id="hw15-loading">loading...</div>}

            <SuperPagination
                page={page}
                itemsCountForPage={count}
                totalCount={totalCount}
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
                {techs.map(t => (
                    <tr key={t.id}>
                        <td id={`hw15-tech-${t.id}`}>{t.tech}</td>
                        <td id={`hw15-developer-${t.id}`}>
                            {t.developer}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}