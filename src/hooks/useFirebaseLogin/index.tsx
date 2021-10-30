import { useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  User,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

const useFirebaseLogin = () => {
  const [user, setUser] = useState<User | null>(null);

  const checkAuth = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
  };

  const connectionWithGoogle = () => {
    const auth = getAuth();
    signInWithRedirect(auth, provider);
  };

  return {
    user,
    checkAuth,
    connectionWithGoogle,
  };
};

export default useFirebaseLogin;
