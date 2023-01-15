import { Provider } from "react-redux";
import { applyMiddleware, createStore, legacy_createStore } from "redux";
import thunk from "redux-thunk";

import rootReducer from './reducers/index'

import { composeWithDevTools } from 'redux-devtools-extension'

const store = legacy_createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

const DataProvider = ({children}) => {
    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default DataProvider