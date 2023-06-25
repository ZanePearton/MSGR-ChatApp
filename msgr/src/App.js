// Import the necessary libraries, modules, and dependencies
import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// Initialize Firebase with your configuration
firebase.initializeApp({
  apiKey: "[Enter API FB Key]",
  authDomain: "[Enter auth FB Key]",
  databaseURL: "[Enter DB FB Key]",
  projectId: "[Enter PrjID FB Key]",
  storageBucket: "[Enter Store FB Key]",
  messagingSenderId: "[Enter Send FB Key]",
  appId: "[Enter AppId FB Key]",
})

// Initialize Firebase services
const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

// Define main App component
function App() {
  // Use Firebase hook to check and monitor auth state
  const [user] = useAuthState(auth);

  // Render main App
  return (
    <div className="App">
      <header>
        <h1>MSGR💬</h1>
        <SignOut /> {/* Render sign out button */}
      </header>
      <section>
        {/* Conditionally render ChatRoom if user is logged in or SignIn if not */}
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

// Define SignIn component
function SignIn() {
  // Define function for signing in with Google
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  // Render SignIn component
  return (
    <>
      {/* On click, signInWithGoogle function is triggered */}
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )
}

// Define SignOut component
function SignOut() {
  // Render sign out button only if a user is logged in
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

// Define ChatRoom component
function ChatRoom() {
  const dummy = useRef(); // Used for automatic scrolling
  const messagesRef = firestore.collection('messages'); // Reference to messages collection in Firestore
  const query = messagesRef.orderBy('createdAt').limit(25); // Query to get latest 25 messages

  // Use Firebase hook to fetch data from the query
  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState(''); // State to handle form input

  // Define function to send message
  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser; // Get uid and photoURL of current user

    // Add new document to messages collection in Firestore
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue(''); // Reset form value
    dummy.current.scrollIntoView({ behavior: 'smooth' }); // Scroll to bottom
  }

  // Render ChatRoom component
  return (<>
    <main>
      {/* Render each message in messages */}
      {messages && messages.map(msg => <ChatMessage key={
        msg.id} message={msg} />)}

      {/* Dummy span for automatic scrolling */}
      <span ref={dummy}></span>
    </main>

    <form onSubmit={sendMessage}>
      {/* Controlled input field for message */}
      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
      {/* Submit button for form, disabled when formValue is empty */}
      <button type="submit" disabled={!formValue}>🕊️</button>
    </form>
  </>)
}

// Define ChatMessage component
function ChatMessage(props) {
  const { text, uid, photoURL } = props.message; // Get text, uid, photoURL from message

  // Set message class based on whether it's sent by current user or not
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  // Render ChatMessage component
  return (<>
    <div className={`message ${messageClass}`}>
      {/* Display user's photo or default photo if none */}
      <img src={photoURL || '[url]'} />
      {/* Display message text */}
      <p>{text}</p>
    </div>
  </>)
}

// Export App component as default
export default App;
