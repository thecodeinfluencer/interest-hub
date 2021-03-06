const initialState = {
  list: [],
  err: null,
  busy: false,
};

export default function groupsReducer(state = initialState, action) {
  switch (action.type) {
    case 'GROUPS_BUSY':
      return { ...state, busy: action.busy };
    case 'LOAD_GROUPS':
      return { ...state, list: action.info, err: null };
    case 'LOAD_MEMBER_LIST': {
      const { memberList, groupID } = action.update;
      const state1 = state;

      const list = state1.list.map(group => {
        let group2 = group;

        if (group.id == groupID) {
          group2.members = memberList;
        }

        return group2;
      });

      return { ...state, list: list, err: null };
    }
    case 'LOAD_MESSAGE_LIST': {
      const { messageList, groupID } = action.update;
      const state1 = state;

      const list = state1.list.map(group => {
        let group2 = group;

        if (group.id == groupID) {
          group2.messages = messageList;
        }

        return group2;
      });

      return { ...state, list: list, err: null };
    }
    case 'CREATE_GROUP':
      return { ...state, err: null };
    case 'UPDATE_GROUP':
      return { ...state, err: null };
    case 'GROUP_ERR':
      return { ...state, err: action.err };
    default:
      return { ...state };
  }
}
