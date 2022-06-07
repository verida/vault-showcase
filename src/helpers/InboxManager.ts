import { DATA_SEND, DATA_REQUEST } from '../constants/inbox'

class InboxManager {
  private _app: any
  constructor(app: any) {
    this._app = app
  }

  /**
   * Given an inbox entry it will return an array of actions that can be
   * performed on the inbox entry. This is for display purposes.
   *
   * @param {*} inboxEntry
   */
  getActions(inboxEntry: { type: any }) {
    const acceptOptions = [
      {
        name: 'accept',
        label: 'Accept'
      },
      {
        name: 'reject',
        label: 'Reject'
      }
    ]

    switch (inboxEntry.type) {
      case DATA_SEND:
      case DATA_REQUEST:
        return acceptOptions
      default:
        return []
    }
  }

  /**
   * Perform the requested action on an inbox entry
   *
   * @param {*} inboxEntry
   * @param {*} action
   * @param payload
   */
  async handleAction(inboxEntry: any, action: any, payload = []) {
    const inbox = await this._app.inbox.getInbox()

    if (inboxEntry.data.status) {
      throw new Error('Data has already been ' + inboxEntry.data.status)
    }

    // update the inboxEntry status
    inboxEntry.data.status = action
    inboxEntry.read = true
    await inbox.save(inboxEntry)

    switch (inboxEntry.type) {
      case DATA_SEND:
        // save the data
        if (action === 'accept') {
          const dataSend = inboxEntry.data.data
          for (const i in dataSend) {
            const dataEntry = dataSend[i]
            const store = await this._app.openDatastore(dataEntry.schema)
            await store.save(dataEntry)
          }
        }
        break
      case DATA_REQUEST:
        // This is a request for a group of data (ie: All my health notes)
        if (action === 'accept') {
          const dataRequest = inboxEntry.data
          const did = inboxEntry.sentBy.did
          const appName = inboxEntry.sentBy.app

          const store = await this._app.openDatastore(dataRequest.requestSchema)
          const response: Record<any, any> = {
            data: null,
            replyId: inboxEntry._id
          }

          if (dataRequest.userSelect) {
            response.data = payload
          } else {
            const foundData = await store.getMany(dataRequest.filter ? dataRequest.filter : {})
            response.data = [foundData]
          }

          const [type, msg] = [DATA_SEND, 'Send you the requested data']
          await this._app.outbox.send(did, type, response, msg, {
            appName: appName
          })
        }
        break
      default:
        console.error('Unknown inbox type: ' + inboxEntry.type)
    }
  }
}

export default InboxManager
