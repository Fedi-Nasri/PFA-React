const AuthReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN": {
        return {
          currentUser: action.payload.currentUser,
          currentRole: action.payload.currentRole,
        };
      }
      case "LOGOUT": {
        return {
          currentUser: null,
          currentRole: null,
        };
      }
      default:
        return state;
    }
  };
  
  export default AuthReducer;