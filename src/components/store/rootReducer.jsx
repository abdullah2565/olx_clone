import { combineReducers } from 'redux'
import Likeslice from './Likeslice'
const rootReducer = combineReducers({

    likeReducer: Likeslice.reducer
})

export default rootReducer