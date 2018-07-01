import { PeerStatus } from '../classes/Peer.class'
import appConstants from '../constants/App.constant'

const initialState = {
  selfName: '',
  peers: {},
  courses: {}, // peer ids that have endered a course: peerId in state.multiPeer.courses['courseId']
  isBrowsing: false,
  isAdvertising: false,
  status: PeerStatus.IDLE, // idle, releasing, viewing, searching
}

const reducerMap = {
  common: {
    setStatus: (state, action) => ({
      ...state,
      multiPeer: {
        ...state.multiPeer,
        status: action.payload,
      },
    }),
  },
  backend: {
    setSelfName: (state, action) => ({
      ...state,
      multiPeer: {
        ...state.multiPeer,
        selfName: action.payload.selfName,
      },
    }),
    loadPeerFromStorage: (state, action) => ({
      ...state,
      multiPeer: {
        ...state.multiPeer,
        peers: action.payload.peers,
        courses: action.payload.courses,
      },
    }),
    browse: state => ({
      ...state,
      multiPeer: {
        ...state.multiPeer,
        isBrowsing: true,
      },
    }),
    stopBrowse: state => ({
      ...state,
      multiPeer: {
        ...state.multiPeer,
        isBrowsing: false,
      },
    }),
    disconnect: state => ({
      ...state,
      multiPeer: {
        ...state.multiPeer,
        selfName: state.multiPeer.selfName,
      },
    }),
    advertise: state => ({
      ...state,
      multiPeer: {
        ...state.multiPeer,
        isAdvertising: true,
      },
    }),
    hide: state => ({
      ...state,
      multiPeer: {
        ...state.multiPeer,
        isAdvertising: false,
      },
    }),
    invite: (state, action) => {
      if (!(action.payload.peerId in state.multiPeer.peers) ||
          state.multiPeer.peers[action.payload.peerId].connected) {
        return state
      }
      const peer = state.multiPeer.peers[action.payload.peerId]
      peer.invited = true
      return {
        ...state,
        multiPeer: {
          ...state.multiPeer,
          peers: {
            ...state.multiPeer.peers,
            [action.payload.peerId]: peer,
          },
        },
      }
    },
    onPeerFoundSet: (state, action) => ({
      ...state,
      multiPeer: {
        ...state.multiPeer,
        peers: action.payload.peers,
        courses: action.payload.courses,
      },
    }),
    onPeerLostSet: (state, action) => {
      if (action.payload.peer.info !== appConstants.SERVICE_TYPE
        || !(action.payload.peer.id in state.multiPeer.peers)) {
        return state
      }
      const peers = Object.assign({}, state.multiPeer.peers)
      peers[action.payload.peer.id].online = false
      return {
        ...state,
        multiPeer: {
          ...state.multiPeer,
          peers,
        },
      }
    },
    onPeerConnected: (state, action) => {
      let peer = Object.assign({}, action.payload.peer)
      if (peer.id in state.multiPeer.peers) {
        peer = state.multiPeer.peers[peer.id]
        peer.connected = true
        peer.online = true
      }
      return {
        ...state,
        multiPeer: {
          ...state.multiPeer,
          peers: {
            ...state.multiPeer.peers,
            [peer.id]: peer,
          },
        },
      }
    },
    onPeerDisconnected: (state, action) => {
      if (!(action.payload.peerId in state.multiPeer.peers)) {
        return state
      }
      const peers = Object.assign({}, state.multiPeer.peers)
      peers[action.payload.peerId].online = false
      peers[action.payload.peerId].connected = false
      return {
        ...state,
        multiPeer: {
          ...state.multiPeer,
          peers,
        },
      }
    },
    onInviteReceivedSet: (state, action) => ({
      ...state,
      multiPeer: {
        ...state.multiPeer,
        peers: action.payload.peers,
      },
    }),
    onInfoUpdate: (state, action) => {
      if (action.payload.info.service !== appConstants.SERVICE_TYPE
        || !(action.payload.peerId in state.multiPeer.peers)) {
        return state
      }
      const peer = state.multiPeer.peers[action.payload.peerId]
      peer.name = action.payload.info.name
      return {
        ...state,
        multiPeer: {
          ...state.multiPeer,
          peers: {
            ...state.multiPeer.peers,
            [action.payload.peerId]: peer,
          },
        },
      }
    },
  },
}

export default { reducerMap, initialState }
