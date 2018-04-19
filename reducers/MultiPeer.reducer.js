import MultiPeerActionTypes from '../actions/MultiPeer.type';

const initState = {
  selfName: 'User-default',
  peers: {},
  isBrowsing: false,
  isAdvertising: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case MultiPeerActionTypes.INIT:
      return {
        ...initState,
        selfName: action.selfName,
      };
    case MultiPeerActionTypes.BROWSE:
      return {
        ...state,
        isBrowsing: true,
      };
    case MultiPeerActionTypes.STOP_BROWSE:
      return {
        ...state,
        isBrowsing: false,
      };
    case MultiPeerActionTypes.DISCONNECT:
      return {
        ...initState,
        selfName: state.selfName,
      };
    case MultiPeerActionTypes.ADVERTISE:
      return {
        ...state,
        isAdvertising: true,
      };
    case MultiPeerActionTypes.HIDE:
      return {
        ...state,
        isAdvertising: false,
      };
    case MultiPeerActionTypes.INVITE: {
      if (!(action.peerId in state.peers)) {
        return state;
      }
      const peer = state.peers[action.peerId];
      peer.invited = true;
      return {
        ...state,
        peers: {
          ...state.peers,
          [action.peerId]: peer,
        },
      };
    }
    case MultiPeerActionTypes.RESPONSE_INVITE: {
      if (!(action.sender.id in state.peers)) {
        return state;
      }
      const peer = state.peers[action.sender.id];
      peer.invitationId = '';
      return {
        ...state,
        peers: {
          ...state.peers,
          [action.sender.id]: peer,
        },
      };
    }
    case MultiPeerActionTypes.ON_PEER_FOUND: {
      return {
        ...state,
        peers: {
          ...state.peers,
          [action.peer.id]: action.peer,
        },
      };
    }
    case MultiPeerActionTypes.ON_PEER_LOST: {
      const peers = Object.assign({}, state.peers);
      delete peers[action.peerId];
      return {
        ...state,
        peers,
      };
    }
    case MultiPeerActionTypes.ON_PEER_CONNECTED: {
      if (!(action.peerId in state.peers)) {
        return state;
      }
      const peer = state.peers[action.peerId];
      peer.connected = true;
      return {
        ...state,
        peers: {
          ...state.peers,
          [action.peerId]: peer,
        },
      };
    }
    case MultiPeerActionTypes.ON_PEER_DISCONNECTED: {
      const peers = Object.assign({}, state.peers);
      delete peers[action.peerId];
      return {
        ...state,
        peers,
      };
    }
    case MultiPeerActionTypes.ON_INVITE_RECEIVED: {
      return {
        ...state,
        peers: {
          ...state.peers,
          [action.peer.id]: action.peer,
        },
      };
    }
    default:
      return state;
  }
};
