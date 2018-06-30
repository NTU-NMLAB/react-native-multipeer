import MultipeerConnection from './MultipeerConnection.class'
import MultiPeerActions from '../../../actions/multiPeer.action'
import { store } from '../../../../App'

export default () => {
  // const selfName = `User-${Math.round(1e6 * Math.random())}`

  MultipeerConnection.registerListeners([
    {
      eventName: 'RCTMultipeerConnectivityPeerFound',
      handler: (event) => {
        store.dispatch(MultiPeerActions.backend.onPeerFound(
          event.peer.id,
          event.peer.info,
        ))
      },
    },
    {
      eventName: 'RCTMultipeerConnectivityPeerLost',
      handler: event => store.dispatch(MultiPeerActions.backend.onPeerLost(event.peer.id)),
    },
    {
      eventName: 'RCTMultipeerConnectivityPeerConnected',
      handler: (event) => {
        store.dispatch(MultiPeerActions.backend.onPeerConnected(event.peer.id))
        store.dispatch(MultiPeerActions.backend.requestInfo(event.peer.id))
      },
    },
    {
      eventName: 'RCTMultipeerConnectivityPeerConnecting',
      handler: event => store.dispatch(MultiPeerActions.backend.onPeerConnecting(event.peer.id)),
    },
    {
      eventName: 'RCTMultipeerConnectivityPeerDisconnected',
      handler: event => store.dispatch(MultiPeerActions.backend.onPeerDisconnected(event.peer.id)),
    },
    {
      eventName: 'RCTMultipeerConnectivityStreamOpened',
      handler: event => store.dispatch(MultiPeerActions.backend.onStreamOpened(event)),
    },
    {
      eventName: 'RCTMultipeerConnectivityInviteReceived',
      handler: (event) => {
        const invitation = {
          id: event.invite.id,
          sender: {
            id: event.peer.id,
            info: event.peer.info,
          },
        }
        store.dispatch(MultiPeerActions.backend.onInviteReceived(invitation))
      },
    },
    {
      eventName: 'RCTMultipeerConnectivityDataReceived',
      handler: event => store.dispatch(MultiPeerActions.backend.onDataReceived(
        event.sender.id,
        event.data,
      )),
    },
  ])

  // Workaround: wait for MultiPeerActions.backend to be loaded
  setTimeout(() => {
    store.dispatch(MultiPeerActions.backend.init())
  })
}

