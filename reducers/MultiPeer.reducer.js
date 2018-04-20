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
    case MultiPeerActionTypes.STOP_BROWSE: {
      return {
        ...state,
        isBrowsing: false,
      };
    }
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
    case MultiPeerActionTypes.HIDE: {
      const peers = {};
      Object.keys(state.peers).forEach((peerId) => {
        if (state.peers[peerId].invitationId === '') {
          peers[peerId] = state.peers[peerId];
        }
      });
      return {
        ...state,
        isAdvertising: false,
        peers,
      };
    }
    case MultiPeerActionTypes.INVITE: {
      if (!(action.peerId in state.peers) || state.peers[action.peerId].connected) {
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
    case MultiPeerActionTypes.ON_PEER_FOUND: {
      if (action.peer.id in state.peers) {
        return state;
      }
      return {
        ...state,
        peers: {
          ...state.peers,
          [action.peer.id]: action.peer,
        },
      };
    }
    case MultiPeerActionTypes.ON_PEER_LOST: {
      if (!(action.peerId in state.peers)) {
        return state;
      }
      const peers = Object.assign({}, state.peers);
      delete peers[action.peerId];
      return {
        ...state,
        peers,
      };
    }
    case MultiPeerActionTypes.ON_PEER_CONNECTED: {
      const peer = Object.assign({}, action.peer);
      if (peer.id in state.peers) {
        peer.name = state.peers[peer.id].name;
      }
      return {
        ...state,
        peers: {
          ...state.peers,
          [peer.id]: peer,
        },
      };
    }
    case MultiPeerActionTypes.ON_PEER_DISCONNECTED: {
      if (!(action.peerId in state.peers)) {
        return state;
      }
      const peers = Object.assign({}, state.peers);
      delete peers[action.peerId];
      return {
        ...state,
        peers,
      };
    }
    case MultiPeerActionTypes.ON_INVITE_RECEIVED: {
      if (action.peer.id in state.peers) {
        return state;
      }
      return {
        ...state,
        peers: {
          ...state.peers,
          [action.peer.id]: action.peer,
        },
      };
    }
    case MultiPeerActionTypes.ON_INFO_UPDATE: {
      if (!(action.peerId in state.peers)) {
        return state;
      }
      const peer = state.peers[action.peerId];
      peer.name = action.info.name;
      return {
        ...state,
        peers: {
          ...state.peers,
          [action.peerId]: peer,
        },
      };
    }
    default:
      return state;
  }
};
