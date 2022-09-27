import "normalize.css/normalize.css";
import "../styles/globals.css";
import { BaseLayout } from "../components/layouts";

import React, { useEffect } from "react";
function useStickyState(defaultValue, key) {
  const [value, setValue] = React.useState(defaultValue);

  React.useEffect(() => {
    const stickyValue = window.sessionStorage.getItem(key);

    if (stickyValue !== null) {
      setValue(JSON.parse(stickyValue));
    }
  }, [key]);

  React.useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default function App({ Component, pageProps }) {
  const [mode, setMode] = useStickyState("dark", "theme");

  useEffect(() => {
    document.body.dataset.theme = mode;
  }, [mode]);
  return (
    <div>
      <BaseLayout setMode={setMode}>
        <Component {...pageProps} />
      </BaseLayout>
    </div>
  );
}
