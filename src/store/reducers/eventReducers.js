const initialState = {
  list: [],
  err: null,
  busy: false,
};

export default function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case 'EVENTS_BUSY':
      return { ...state, busy: action.busy };
    case 'LOAD_EVENTS':
      return { ...state, list: action.info, err: null };
    case 'LOAD_ATTENDEES_LIST': {
      const { memberList, eventID } = action.update;
      const state1 = state;

      const list = state1.list.map(event => {
        let event2 = event;

        if (event.id == eventID) {
          event2.attendees = memberList;
        }

        return event2;
      });

      return { ...state, list: list, err: null };
    }
    case 'CREATE_EVENT':
      return { ...state, err: null };
    case 'EVENT_ERR':
      return { ...state, err: action.err };
    default:
      return { ...state };
  }
}
