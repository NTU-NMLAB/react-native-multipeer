export default class Peer {
  constructor(id, name, connected = false, invited = false, invitationId = '') {
    this.id = id;
    this.name = name;
    this.connected = connected;
    this.invited = invited;
    this.invitationId = invitationId;
  }
}
