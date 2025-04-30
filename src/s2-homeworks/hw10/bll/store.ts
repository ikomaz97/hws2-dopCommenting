import { combineReducers, legacy_createStore } from 'redux';
import { loadingReducer } from './loadingReducer';
import { themeReducer } from '../../hw12/bll/themeReducer';

const reducers = combineReducers({
    loading: loadingReducer, // hw10
    theme: themeReducer, // hw12
});

const store = legacy_createStore(reducers);

export default store;

// Типизация состояния приложения
export type AppStoreType = ReturnType<typeof reducers>;

// Доступ к store в разработке для автотестов
if (process.env.NODE_ENV === 'development') {
    // @ts-ignore
    window.store = store;
}