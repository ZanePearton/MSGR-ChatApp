# MSGR - A Firebase & React based chat application

MSGR is a chat application built using React and Firebase. It allows users to sign in using Google and interact in a chat room. The Firebase Firestore database is used to handle real-time data, and Firebase Authentication is used for Google sign-ins.

## Features

- Google Authentication
- Real-time chat functionality
- Ability to sign in and out

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You'll need the following software installed to get started.

- [Node.js and NPM](https://nodejs.org/): We're using Node version 12.16.1 and NPM version 6.13.4

- [Git](https://git-scm.com/): We're using version 2.25.1

### Development Setup

1. Clone this repository to your local machine:

```bash
git clone https://github.com/[YourUsername]/MSGR.git
cd MSGR
```

2. Install project dependencies:

```bash
npm install
```

3. Update the Firebase credentials:

In the file `src/App.js`, replace all placeholders (`[Enter ... FB Key]`) in the `firebase.initializeApp` function with your Firebase project's credentials:

```javascript
firebase.initializeApp({
  apiKey: "[Enter API FB Key]",
  authDomain: "[Enter auth FB Key]",
  databaseURL: "[Enter DB FB Key]",
  projectId: "[Enter PrjID FB Key]",
  storageBucket: "[Enter Store FB Key]",
  messagingSenderId: "[Enter Send FB Key]",
  appId: "[Enter AppId FB Key]",
})
```

4. Start the development server:

```bash
npm start
```

The React application should now be up and running at `http://localhost:3000`!

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Author

[Zane Pearton](https://www.linkedin.com/in/zane-pearton/)
