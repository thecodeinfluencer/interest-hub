const initialState = {
  list: [],
  chatlist: [],
  info: null,
  err: null,
  busy: false,
};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case 'MESSAGE_BUSY':
      return { ...state, busy: action.busy };
    case 'LOAD_CHAT_LIST':
      return { ...state, chatlist: action.chatlist, err: null };
    case 'LOAD_MESSAGES':
      return { ...state, list: action.messages, err: null };
    case 'SEND_MESSAGE':
      return { ...state, info: action.info, err: null };
    case 'SEND_MESSAGE_ERROR':
      return { ...state, info: null, err: action.err };
    default:
      return { ...state };
  }
}
