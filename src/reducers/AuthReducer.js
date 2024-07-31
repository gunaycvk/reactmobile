export default (user, action) => {
  switch (action.type) {
    case "SAVE_USER":
      return {
        ...user,
        isLoggedIn: true,
        jwtData: action.jwtData,
        jwtToken:action.jwtToken,
        userData: action.userData,
      };
    case "LOGOUT":
      return {
        ...user,
        isLoggedIn: false,
        jwtData: {},
        jwtToken:null,
        userData: {},
      };
    default:
      return {
        ...user,
        isLoggedIn: false,
        jwtData: {},
        jwtToken:null,
        userData: {},
      };
  }
};
