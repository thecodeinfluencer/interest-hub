const initialState = {
  list: [],
  err: null,
  busy: false,
};

export default function forumsReducer(state = initialState, action) {
  switch (action.type) {
    case 'FORUMS_BUSY':
      return { ...state, busy: action.busy };
    // case "SEND_MESSAGE":
    //   return { ...state, err: null };
    case 'LOAD_FORUMS':
      return { ...state, list: action.info, err: null };
    case 'LOAD_MESSAGES':
      return {
        ...state,
        [action?.info?.docRef]: action?.info?.messages,
        err: null,
      };
    case 'LOAD_FORUMS_ERROR':
      return { ...state, list: [], err: action.err };
    case 'SEND_MESSAGE_ERROR':
      return { ...state, err: action.err };
    default:
      return { ...state };
  }
}
