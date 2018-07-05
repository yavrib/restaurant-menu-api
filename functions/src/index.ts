import * as functions from 'firebase-functions';
import App from './App';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const api = functions.https.onRequest(App);
