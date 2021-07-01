import React from 'react';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
} from '@material/react-dialog';
 
export default function CreateModal(props) {

    return (
      <Dialog open={props.showModal}>
        <DialogTitle>Create room</DialogTitle>
        <DialogContent>
            <div className="mdc-dialog__content" id="my-dialog-content-username">
                Enter Username:
                <div className="mdc-text-field">
                    <input type="text" value={props.user} onChange={(e)=>props.setUser(e.target.value)} className="mdc-text-field__input"/>
                    <label className="mdc-floating-label" htmlFor="my-text-field"></label>
                    <div className="mdc-line-ripple"></div>
                </div>
            </div>
        </DialogContent>
        <DialogFooter>
          <DialogButton action='dismiss'>Dismiss</DialogButton>
          <DialogButton action='accept' isDefault onClick={props.createRoom} >Create</DialogButton>
        </DialogFooter>
      </Dialog>
    );
}