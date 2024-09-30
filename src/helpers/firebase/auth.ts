import {
  getAuth,
  GoogleAuthProvider,
  NextOrObserver,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import firebaseApp from ".";

const auth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () =>
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (!credential) {
        throw new Error("No credential");
      }
      const token = credential.accessToken;
      const user = result.user;
      console.log({ token, user });
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error({ errorCode, errorMessage, email, credential });
    });

export const signOutUser = () => signOut(auth);

export const getCurrentUser = () => {
  if (!auth.currentUser) {
    throw new Error("No user");
  }
  return auth.currentUser;
};

export const onAuthStateChange = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);
