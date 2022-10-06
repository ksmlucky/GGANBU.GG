import { AiLayout } from "../../components/layouts/index";
import React, { useEffect } from "react";
import Ai from "../../components/ai/Ai";

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

// app
export default function ai() {
  const [mode, setMode] = useStickyState("dark", "theme");


  useEffect(() => {
    document.body.dataset.theme = mode;
  }, [mode]);

  return (
    <>
      <Ai setMode={setMode} mode={mode} />
    </>
  );
}
