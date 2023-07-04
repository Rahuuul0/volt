import Layout from "../components/Layout";
import { RecoilRoot } from "recoil";

function myApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}

export default myApp;
