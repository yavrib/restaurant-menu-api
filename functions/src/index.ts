import * as functions from 'firebase-functions';
import App from './App';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// This should be just as easy as firebase-functions
// if I decide to change it to AWS Lambda.

export const v1 = functions.https.onRequest(App);
