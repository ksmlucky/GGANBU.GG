import "normalize.css/normalize.css";
import "../styles/globals.css";
import { BaseLayout } from "../components/layouts";

export default function App({ Component, pageProps }) {
  return (
    <div>
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
    </div>
  );
}
