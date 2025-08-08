-- Firestore Security Rules (copy this to your Firebase Console)
-- Go to Firestore Database > Rules and paste this:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read and write access to all canvas documents
    match /canvases/{canvasId} {
      allow read, write: if true;
    }
  }
}
