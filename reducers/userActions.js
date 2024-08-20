function handleSetUser(user) {
    dispatch({
      type: 'setUser',
      id: user
    });
  }
  
  function handleUpdateUser(user) {
    dispatch({
      type: 'updateUser',
      user
    });
  }
  
  function handleSignOut() {
    dispatch({
      type: 'signOut'
    });
  }