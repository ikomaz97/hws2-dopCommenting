export const pureChange = (sort: string, downSort: string) => {
    const upSort = '1' + downSort.substring(1)

    if (sort === '') return upSort
    if (sort === upSort) return downSort
    if (sort === downSort) return ''

    return upSort
}