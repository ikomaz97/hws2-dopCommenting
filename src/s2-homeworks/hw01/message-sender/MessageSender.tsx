import React, {useEffect, useRef, useState} from 'react'
import {message0, user1, user2} from '../HW1'
import s from './MessageSender.module.css'

// компонента, которая тестирует вашу компоненту (не изменять, any не трогать)
const MessageSender = (props: any) => {
    const M = props.M
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [messages, setMessages] = useState<any[]>([])
    const [text, setText] = useState<any>('')
    const [userIndex, setUserIndex] = useState<number>(0)

    const onChange = (e: any) => {
        setText(e.currentTarget.value)
    }

    useEffect(() => {
        if (textareaRef?.current) {
            textareaRef.current.style.height = '0px'
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
        }
    }, [text])

    const addMessage = () => {
        // чередование пользователей
        const currentUser = userIndex === 0 ? user1 : user2
        setUserIndex(userIndex === 0 ? 1 : 0)

        setMessages([
            ...messages,
            {
                id: messages.length ? messages.length + 1 : 1,
                user: currentUser,
                message: {
                    text,
                    time: new Date().toTimeString().slice(0, 5),
                },
            },
        ])
        setTimeout(() => setText(''), 4)
    }

    const onKeyDown = (e: any) => {
        e.key === 'Enter' && e.shiftKey && addMessage()
    }

    return (
        <>
            {messages.map((m) => (
                <M key={'message' + m.id} message={m} />
            ))}

            <div id={'hw1-send-message-form'} className={s.sendForm}>
                <textarea
                    id={'hw1-textarea'}
                    className={s.textarea}
                    ref={textareaRef}

                    title={'Shift+Enter for send'}
                    placeholder={'Type your message'}
                    value={text}

                    onChange={onChange}
                    onKeyDown={onKeyDown}
                />
                <button
                    id={'hw1-button'}
                    className={s.button}

                    onClick={addMessage}
                >
                    {/*текст кнопки могут изменить студенты*/}
                    Send
                    {/**/}
                </button>
            </div>
        </>
    )
}

export default MessageSender