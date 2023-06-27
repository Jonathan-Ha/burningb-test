import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import RootSaga from '@/stores/root.saga';
import Reducers from '@/stores/root.reducer';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: Reducers,
    middleware: [sagaMiddleware],
});

if (typeof window !== 'undefined' && !localStorage.getItem("user")) {
    localStorage.setItem("user", JSON.stringify(store.getState().user));
}

if (typeof window !== 'undefined') {
    store.subscribe(() => {
        try {
            localStorage.setItem("user", JSON.stringify(store.getState().user));
        } catch (e) {
            console.log(e);
        }
    });
}


sagaMiddleware.run(RootSaga);

export default store;
