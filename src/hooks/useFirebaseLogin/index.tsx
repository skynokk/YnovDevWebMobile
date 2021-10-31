import { useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  User,
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

const useFirebaseLogin = () => {
  const [user, setUser] = useState<User | null>(null);

  const checkAuth = (): Promise<void> =>
    new Promise((resolve) => {
      const auth = getAuth();
      onAuthStateChanged(auth, (u) => {
        setUser(u);
        resolve();
      });
    });

  const connectionWithGoogle = () => {
    const auth = getAuth();
    signInWithRedirect(auth, provider);
  };

  const connectEmailPassword = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((value) => {
        console.log(value);
      })
      // if user dosn't exist create new user
      .catch(() => {
        createUserWithEmailAndPassword(auth, email, password).then((value) => {
          console.log(value);
        });
      });
  };

  const logout = () => {
    const auth = getAuth();
    signOut(auth);
  };

  return {
    user,
    checkAuth,
    connectionWithGoogle,
    connectEmailPassword,
    logout,
  };
};

export default useFirebaseLogin;
