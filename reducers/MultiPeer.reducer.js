const initialState = {
  userId: '',
  peersInfo: {},
  peersStatus: {},
  isBrowsing: false,
  isAdvertising: false,
  isReleasing: false,
}

const reducerMap = {
  common: {
    updateOwnStatus: (state, action) => {
      switch (action.payload) {
      case 'RELEASE':
      case 'START_RELEASE':
        return { ...state, multiPeer: { ...state.multiPeer, isReleasing: true } }
      case 'STOP_RELEASE':
        return { ...state, multiPeer: { ...state.multiPeer, isReleasing: false } }
      case 'ADVERTISE':
      case 'START_ADVERTISE':
        return { ...state, multiPeer: { ...state.multiPeer, isAdvertising: true } }
      case 'HIDE':
      case 'STOP_ADVERTISE':
        return { ...state, multiPeer: { ...state.multiPeer, isAdvertising: false } }
      case 'BROWSE':
      case 'START_BROWSE':
        return { ...state, multiPeer: { ...state.multiPeer, isBrowsing: true } }
      case 'STOP_BROWSE':
        return { ...state, multiPeer: { ...state.multiPeer, isBrowsing: false } }
      default:
        return state
      }
    },
    updatePeerInfo: (state, action) => ({
      ...state,
      multiPeer: {
        ...state.multiPeer,
        peersInfo: {
          ...state.peersInfo,
          [action.payload.userId]: action.payload,
        },
      },
    }),
    updatePeerStatus: (state, action) => ({
      ...state,
      multiPeer: {
        ...state.multiPeer,
        peersStatus: {
          ...state.peersStatus,
          [action.payload.userId]: action.payload.peerStatus,
        },
      },
    }),
  },
  backend: {
    setUserId: (state, action) => ({
      ...state,
      multiPeer: {
        ...state.multiPeer,
        userId: action.payload,
      },
    }),
    initPeersInfo: (state, action) => ({
      ...state,
      multiPeer: {
        ...state.multiPeer,
        peersInfo: action.payload,
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
        peersStatus: {},
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
      const invitedEntry = Object.entries(state.multiPeer.peersStatus).find(e => e[1].currPeerId === action.payload.peerId)
      if (invitedEntry === undefined || invitedEntry[1].connected) {
        return state
      }
      invitedEntry[1].invited = true
      const newPeerStatus = Object.assign({}, invitedEntry[1])
      return {
        ...state,
        multiPeer: {
          ...state.multiPeer,
          peersStatus: {
            ...state.multiPeer.peersStatus,
            [invitedEntry[0]]: newPeerStatus,
          },
        },
      }
    },
    onPeerLost: (state, action) => {
      const lostEntry = Object.entries(state.multiPeer.peersStatus).find(e => e[1].currPeerId === action.payload)
      if (lostEntry === undefined) {
        return state
      }
      const { [lostEntry[0]]: lost, ...rest } = state.multiPeer.peersStatus
      return {
        ...state,
        multiPeer: {
          ...state.multiPeer,
          peersStatus: rest,
        },
      }
    },
    onPeerConnected: (state, action) => {
      const connectedEntry = Object.entries(state.multiPeer.peersStatus).find(e => e[1].currPeerId === action.payload)
      if (connectedEntry === undefined) {
        return state
      }
      const newPeersStatus = Object.assign({}, state.multiPeer.peersStatus)
      newPeersStatus[connectedEntry[0]].connected = true
      const newUserIds = state.currCourse.userIds
      if (!newUserIds.includes(connectedEntry[0])) {
        newUserIds.push(connectedEntry[0])
      }
      return {
        ...state,
        currCourse: {
          ...state.currCourse,
          userIds: newUserIds,
        },
        multiPeer: {
          ...state.multiPeer,
          peersStatus: newPeersStatus,
        },
      }
    },
    onPeerDisconnected: (state, action) => {
      const disconnEntry = Object.entries(state.multiPeer.peersStatus).find(e => e[1].currPeerId === action.payload)
      if (disconnEntry === undefined) {
        return state
      }
      const { [disconnEntry[0]]: disconn, ...rest } = state.multiPeer.peersStatus
      return {
        ...state,
        multiPeer: {
          ...state.multiPeer,
          peersStatus: rest,
        },
      }
    },
  },
}

export default { reducerMap, initialState }
