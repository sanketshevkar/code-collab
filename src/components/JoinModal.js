import React from 'react';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
} from '@material/react-dialog';
 
export default function JoinModal(props) {

    return (
      <Dialog open={props.showModal}>
        <DialogTitle>Join room</DialogTitle>
        <DialogContent>
            <div className="mdc-dialog__content" id="my-dialog-content-username">
                Enter Username:
                <div className="mdc-text-field">
                    <input type="text" value={props.user} onChange={(e)=>props.setUser(e.target.value)} className="mdc-text-field__input"/>
                    <label className="mdc-floating-label" htmlFor="my-text-field"></label>
                    <div className="mdc-line-ripple"></div>
                </div>
            </div>
            <div className="mdc-dialog__content" id="my-dialog-content-roomId">
                Enter ID for room to join:
                <div className="mdc-text-field">
                    <input type="text" value={props.roomId} onChange={(e)=>props.setRoomId(e.target.value)} className="mdc-text-field__input"/>
                    <label className="mdc-floating-label" htmlFor="my-text-field"></label>
                    <div className="mdc-line-ripple"></div>
                </div>
            </div>
        </DialogContent>
        <DialogFooter>
          <DialogButton action='dismiss'>Dismiss</DialogButton>
          <DialogButton action='accept' isDefault onClick={props.joinRoom} >Join</DialogButton>
        </DialogFooter>
      </Dialog>
    );
}
