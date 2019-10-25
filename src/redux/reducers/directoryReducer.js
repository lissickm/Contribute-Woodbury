
const nonprofitList = (state = [], action) => {
  switch (action.type) {
    case 'SET_DIRECTORY':
      return action.payload;
    default:
      return state;
  }
}

export default nonprofitList;