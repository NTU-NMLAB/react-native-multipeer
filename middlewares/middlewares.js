import MultiPeerActionTypes from '../actions/MultiPeer.type';
import MultiPeerActions from '../actions/MultiPeer.action';
import MessageType from '../constants/MessageType.constant';

const messageMiddleware = ({ dispatch, getState }) => (
  next => (
    (action) => {
      if (typeof action === 'object' && action.type === MultiPeerActionTypes.ON_DATA_RECEIVED) {
        switch (action.data.messageType) {
          case MessageType.REQUEST_INFO:
            dispatch(MultiPeerActions.returnInfo(action.senderId, {
              name: getState().multipeer.selfName,
            }));
            break;
          case MessageType.RETURN_INFO:
            dispatch(MultiPeerActions.onInfoUpdate(action.senderId, action.data.info));
            break;
          default:
            break;
        }
      }
      return next(action);
    }
  )
);

const middlewares = [
  messageMiddleware,
];

export default middlewares;
