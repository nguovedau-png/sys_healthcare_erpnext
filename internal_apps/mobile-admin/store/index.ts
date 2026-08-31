import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

// Create socket connection
const socket = io('http://localhost:3002'); // Adjust this to your socket service URL
const socketIoMiddleware: any = createSocketIoMiddleware(socket, 'server/');

// Initial state
const initialState = {
  conversations: {},
  usersOnline: [],
  selfUser: null
};

// Reducer
function reducer(state = initialState, action: any) {
  switch (action.type) {
    case 'users_online':
      const conversations = { ...state.conversations };
      const usersOnline = action.data;
      for (let i = 0; i < usersOnline.length; i++) {
        const userId = usersOnline[i].userId;
        if (conversations[userId] === undefined) {
          conversations[userId] = {
            messages: [],
            username: usersOnline[i].username
          };
        }
      }
      return { ...state, usersOnline, conversations };
    case 'private_message':
      const conversationId = action.data.conversationId;
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [conversationId]: {
            ...state.conversations[conversationId],
            messages: [
              action.data.message,
              ...state.conversations[conversationId].messages
            ]
          }
        }
      };
    case 'self_user':
      return { ...state, selfUser: action.data };
    default:
      return state;
  }
}

// Create store with middleware
const store: any = createStore(reducer, applyMiddleware(socketIoMiddleware));

// Subscribe to store changes for debugging
store.subscribe(() => {
  console.log('new state', store.getState());
});

export default store;