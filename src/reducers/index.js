import { combineReducers } from 'redux'
import UserReducer from './UserReducer'
import ConversationReducer from './ConversationReducer'

const rootReducer = combineReducers({
    user: UserReducer,
    conversations: ConversationReducer
})

export default rootReducer