import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './s1-main/App';
import reportWebVitals from './reportWebVitals';
import store from './s2-homeworks/hw10/bll/store';
import { Provider } from 'react-redux';
import { DevSupport } from '@react-buddy/ide-toolbox';
import { ComponentPreviews, useInitial } from './dev';

const container = document.getElementById('root');

if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
                    <App />
                </DevSupport>
            </Provider>
        </React.StrictMode>
    );

    // Запускаем метрики (если нужны)
    reportWebVitals();
} else {
    console.error("❌ Элемент с id='root' не найден в HTML. Убедись, что в public/index.html есть <div id='root'></div>");
}