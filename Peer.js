import { EventEmitter } from 'events';

export default class Peer extends EventEmitter {
  constructor(id, name, connected = false, invited = false, invitationId = '') {
    super(id, name);
    this.id = id;
    this.name = name;
    this.connected = connected;
    this.invited = invited;
    this.invitationId = invitationId;
  }
}
