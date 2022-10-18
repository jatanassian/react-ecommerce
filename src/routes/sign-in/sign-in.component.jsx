import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAUth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  useEffect(() => {
    async function afterGoogleRedirect() {
      const response = await getRedirectResult(auth);
      if (response) {
        createUserDocumentFromAUth(response.user);
      }
    }
    afterGoogleRedirect();
  }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    createUserDocumentFromAUth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button>
    </div>
  );
};

export default SignIn;
