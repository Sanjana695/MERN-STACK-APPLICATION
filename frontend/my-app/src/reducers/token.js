const initialState = "hello";
const getTokenValue = (state = initialState, action) => {
  switch (action.type) {
    case "token":
      return action.payload;
    default:
      return state;
  }
};
export default getTokenValue;
