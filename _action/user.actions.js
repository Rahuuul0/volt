import { useRecoilState, useSetRecoilState } from "recoil";
import { authAtom } from "../_state";
import Router from "next/router";
import { db, auth, storage, provider } from "../config/fire-config";
import { signInWithEmailAndPassword } from "firebase/auth";

const useUserActions = () => {
  const setAuth = useSetRecoilState(authAtom);

  const login = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password).then(
        async (response) => {
          localStorage.setItem(
            "Auth Token",
            response._tokenResponse.refreshToken
          );
        }
      );
      Router.push("/");
    } catch (error) {
      alert(error);
    }
  };

  return {
    login,
  };
};
export { useUserActions };
