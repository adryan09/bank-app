import React from 'react';
import './App.css';
import { Home } from './first-page/home'
import { applyMiddleware, createStore } from 'redux';
import { AppReducer } from './store/reducer';
import { Provider } from 'react-redux';
import { AddNewCard } from './add-new-card/add-new-card';
import thunk from 'redux-thunk';
import { EditCard } from './edit-your-card/edit-your-card';
const enhancer = applyMiddleware(thunk);
const store = createStore(AppReducer, enhancer);

function App() {
    return (
        <Provider store={store}>
            <div className='provider-wrapper' style={{ position: 'relative'}}>
                <Home />
                <AddNewCard />
                <EditCard />
            </div>
        </Provider>
    );
}

export default App;
