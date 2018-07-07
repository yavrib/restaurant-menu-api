import * as functions from 'firebase-functions';
import App from './App';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// This should be just as easy as firebase-functions
// if I decide to change it to AWS Lambda.

// Update this as v1 so that you have api versioning.
export const api = functions.https.onRequest(App);
