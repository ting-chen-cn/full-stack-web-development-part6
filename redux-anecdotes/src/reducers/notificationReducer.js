const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'REMOVE_NOTIFICATION':
      return null
    default:
      return state
  }
}

const notificationSetting = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification,
  }
}
const notificationRemoving = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
  }
}

export const setNotification = (notification, t) => {
  return async (dispatch) => {
    console.log(notification)
    dispatch(notificationSetting(notification))
    setTimeout(() => {
      dispatch(notificationRemoving())
    }, t * 1000)
  }
}
export default notificationReducer
