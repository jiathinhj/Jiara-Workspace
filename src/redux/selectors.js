// filter user
export const userSelector = (state) => {
  const matchedUsers = state.user.allUser.filter((user) => {
    return !state.user.filterUserChange
      ? state.user.allUser
      : state.user.filterUserChange &&
          user &&
          user.username.toLowerCase().includes(state.user.filterUserChange);
  });
  return matchedUsers;
};
