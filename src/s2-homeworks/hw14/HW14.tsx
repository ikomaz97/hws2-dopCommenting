import React, { useState, useCallback } from 'react'
import { SuperDebouncedInput } from './common/SuperDebouncedInput'
import s from './HW14.module.css'

// Полная база данных технологий
const techs = [
    { id: 1, value: 'html', tech: 'html' },
    { id: 2, value: 'css', tech: 'css' },
    { id: 3, value: 'scss', tech: 'scss' },
    { id: 4, value: 'javascript', tech: 'javascript' },
    { id: 5, value: 'typescript', tech: 'typescript' },
    { id: 6, value: 'react', tech: 'react' },
    { id: 7, value: 'redux', tech: 'redux' },
    { id: 8, value: 'jest', tech: 'jest' }, // Добавляем Jest
]

export const HW14 = () => {
    const [filteredTechs, setFilteredTechs] = useState(techs)
    const [isLoading, setIsLoading] = useState(false)

    // Пункт 2 - функция sendQuery
    const sendQuery = async (value: string) => {
        setIsLoading(true)

        // Имитация задержки запроса
        await new Promise(resolve => setTimeout(resolve, 1000))

        if (!value.trim()) {
            setFilteredTechs(techs)
        } else {
            const filtered = techs.filter(tech =>
                tech.value.toLowerCase().includes(value.toLowerCase())
            )
            setFilteredTechs(filtered)
        }

        setIsLoading(false)
    }

    // Пункт 3 - функция onChangeText
    const onChangeText = useCallback((value: string) => {
        sendQuery(value)
    }, [])

    return (
        <div className={s.container}>
            <h2 className={s.title} id="hw14-title">
                Homework 14
            </h2>

            <div className={s.content}>
                <SuperDebouncedInput
                    onChangeText={onChangeText}
                    placeholder="введите технологию..."
                    delay={1000}
                />

                {isLoading && (
                    <div id="hw14-loading" className={s.loading}>
                        loading...
                    </div>
                )}

                {/* Отображаем каждую технологию в отдельном div с уникальным ID */}
                {filteredTechs.map(tech => (
                    <div
                        key={tech.id}
                        id={`hw14-tech-${tech.value}`}
                        className={s.techItem}
                    >
                        {tech.tech}
                    </div>
                ))}
            </div>
        </div>
    )
}