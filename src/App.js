import React, {useState, useRef} from 'react';
import './App.css';
import CodeMirror from '@uiw/react-codemirror';
import firebase from './firebase/index';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
import JoinModal from './components/JoinModal';
import CreateModal from './components/CreateModal';

function App() {

  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [code, setCode] = useState("");
  const [control, setControl] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const roomId = useRef();
  const username = useRef("");
  const newData = useRef();

  const onChangeHandler = async(editor) =>{
    if(newData.current.user === username.current){
      const Newcode = editor.getValue();
      var msg = {
        user: username.current,
        value: Newcode
      };
      const db = firebase.firestore();
      const roomRef = db.collection('rooms').doc(`${roomId.current}`);
      await roomRef.set(msg);
    }
  }

  const controlHandler = async() =>{
    console.log(username.current)
    var msg = {
      user: username.current,
      value: code
    };
    const db = firebase.firestore();
    const roomRef = db.collection('rooms').doc(`${roomId.current}`);
    await roomRef.set(msg);
    setControl(true);
  }

  const onClickCreateRoom = async() => {
    const db = firebase.firestore();
    const roomRef = db.collection('rooms').doc();
    var msg = {
      user: username.current,
      value: '//Write JSX code'
    };
    await roomRef.set(msg);
    newData.current = msg;
    roomId.current = (roomRef.id);
    setRoom(roomRef.id);
    setCode('//Write JSX code');
    setButtonDisable(true);
    setControl(true);
    db.collection("rooms").doc(`${roomId.current}`)
      .onSnapshot((doc) => {
          newData.current = doc.data()
          if (newData.current.user !== username.current) {
            setControl(false);
            setCode(newData.current.value);
          }
      });
  }

  const onClickJoin = async(event) =>{
    event.preventDefault();
    username.current = user;
    roomId.current = room;
    const db = firebase.firestore();
    setButtonDisable(true);
    db.collection("rooms").doc(`${roomId.current}`)
      .onSnapshot((doc) => {
          newData.current = doc.data()
          if (newData.current.user !== username.current) {
            setControl(false);
            setCode(newData.current.value);
          }
      });
  }

  const onClickCopy = () => {
    navigator.clipboard.writeText(roomId.current);
  }

  return (
    <div>
      <div style={{margin: '1rem'}}>
          <span className="roomIdSpan" id="currentRoom">
            <button className="roomIdButton">
            <i className="material-icons mdc-button__icon" aria-hidden="true">person</i>
            </button>
            <b>Username: </b> 
            {user}
            </span>
      </div>
      <div style={{margin: '1rem'}}>
          <span className="roomIdSpan" id="currentRoom">
            <button className="roomIdButton" onClick={onClickCopy}>
              <i className="material-icons mdc-button__icon" aria-hidden="true">assignment</i>
            </button>
            <b>Room ID: </b> 
            {room}
            </span>
      </div>
      <div>
        <button className="mdc-button mdc-button--raised button" disabled={buttonDisable} onClick={()=>setShowJoinModal(true)}>
            <i className="material-icons mdc-button__icon" aria-hidden="true">group</i>
            <span className="mdc-button__label">Join room</span>
        </button>
        <button className="mdc-button mdc-button--raised button" disabled={buttonDisable} onClick={()=>setShowCreateModal(true)}>
            <i className="material-icons mdc-button__icon" aria-hidden="true">group</i>
            <span className="mdc-button__label">Create room</span>
        </button>
        <button className="mdc-button mdc-button--raised button" disabled={control} onClick={controlHandler}>
            <i className="material-icons mdc-button__icon" aria-hidden="true">group</i>
            <span className="mdc-button__label">Take Control</span>
        </button>
        <JoinModal showModal={showJoinModal} setShowModal={setShowJoinModal} joinRoom={onClickJoin} user={user} setUser={setUser} roomId={room} setRoomId={setRoom} />
        <CreateModal showModal={showCreateModal} setShowModal={setShowCreateModal} createRoom={onClickCreateRoom} user={user} setUser={setUser} />
      </div>
      <div style={{height: '100em'}}>
      <CodeMirror
        value={code}
        options={{
          theme: 'monokai',
          keyMap: 'sublime',
          mode: 'jsx'
        }}
        onChange={(editor)=>onChangeHandler(editor)}
      />
      </div>
    </div>
  );
}

export default App;

