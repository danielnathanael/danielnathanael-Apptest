import React from 'react'
import Routes from './src/Routes'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import HomeReducer from './src/views/home/HomeReducer'
import ContactReducer from './src/views/contact/ContactReducer'
import formReducer from './src/views/form/FormReducer'

const mainReducer = combineReducers({
  home: HomeReducer,
  contact: ContactReducer,
  form: formReducer,
})

const store = createStore(mainReducer)
const App = () => {
  return <Provider store={store}>
    <Routes />
  </Provider>
}

export default App