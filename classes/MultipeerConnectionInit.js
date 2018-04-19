import MultipeerConnection from './MultipeerConnection';
import MultiPeerActions from '../actions/MultiPeer.action';
import store from '../../../components/smart/app/Store';

export default () => {
  const selfName = `User-${Math.round(1e6 * Math.random())}`;

  MultipeerConnection.registerListeners([
    {
      eventName: 'RCTMultipeerConnectivityPeerFound',
      handler: event => store.dispatch(MultiPeerActions.onPeerFound(
        event.peer.id,
        event.peer.info.name,
      )),
    },
    {
      eventName: 'RCTMultipeerConnectivityPeerLost',
      handler: event => store.dispatch(MultiPeerActions.onPeerLost(event.peer.id)),
    },
    {
      eventName: 'RCTMultipeerConnectivityPeerConnected',
      handler: event => store.dispatch(MultiPeerActions.onPeerConnected(event.peer.id)),
    },
    {
      eventName: 'RCTMultipeerConnectivityPeerConnecting',
      handler: event => store.dispatch(MultiPeerActions.onPeerConnecting(event.peer.id)),
    },
    {
      eventName: 'RCTMultipeerConnectivityPeerDisconnected',
      handler: event => store.dispatch(MultiPeerActions.onPeerDisconnected(event.peer.id)),
    },
    {
      eventName: 'RCTMultipeerConnectivityStreamOpened',
      handler: event => store.dispatch(MultiPeerActions.onStreamOpened(event)),
    },
    {
      eventName: 'RCTMultipeerConnectivityInviteReceived',
      handler: (event) => {
        const invitation = {
          id: event.invite.id,
          sender: {
            id: event.peer.id,
            name: event.peer.info.name,
          },
        };
        store.dispatch(MultiPeerActions.onInviteReceived(invitation));
      },
    },
    {
      eventName: 'RCTMultipeerConnectivityDataReceived',
      handler: (event) => {
        const data = {
          ...event,
          sender: event.peer.id,
        };
        store.dispatch(MultiPeerActions.onDataReceived(data));
      },
    },
  ]);

  // Workaround: wait for MultiPeerActions to be loaded
  setTimeout(() => {
    store.dispatch(MultiPeerActions.init(selfName));
  });
};

