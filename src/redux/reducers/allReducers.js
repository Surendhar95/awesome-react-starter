import { combineReducers  } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { authReducer } from './authReducer'

const filterPersistConfig = {
  key: 'auth',
  storage
}

const appReducers = combineReducers({
  auth: persistReducer(filterPersistConfig, authReducer),
})

export default appReducers
