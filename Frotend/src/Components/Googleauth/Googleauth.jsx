import { useGoogleLogin } from "@react-oauth/google";
const Googleauth = () => {
  const responese = async (authResult) => {
    try {
      console.log("authResult");
    } catch (err) {
      console.log("Error during Google login", err);
    }
  };

  const googlelogin = useGoogleLogin({
    onSuccess: responese,
    onError: responese,
    flow: "auth-code",
  });
  return null;
};

export default Googleauth;
