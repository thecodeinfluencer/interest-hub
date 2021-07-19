const initialState = {
  list: [],
  err: null,
  busy: false,
};

export default function peopleReducer(state = initialState, action) {
  switch (action.type) {
    case 'PEOPLE_BUSY':
      return { ...state, busy: action.busy };
    case 'LOAD_PEOPLE':
      return { ...state, list: action.info, err: null };
    case 'LOAD_PEOPLE_ERROR':
      return { ...state, list: [], err: action.err };
    default:
      return { ...state };
  }
}
