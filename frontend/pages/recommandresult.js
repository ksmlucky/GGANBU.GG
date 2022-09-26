import { RecommandResultLayout } from "../components/layouts/index";
import React, { useEffect } from "react";
//import

import RecommandResultList from "../components/recommandResultList/RecommandResultList";
// app

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

export default function Recommandresult() {
  const [mode, setMode] = useStickyState("dark", "theme");

  useEffect(() => {
    document.body.dataset.theme = mode;
  }, [mode]);

  return (
    <>
      <RecommandResultList setMode={setMode}></RecommandResultList>
    </>
  );
}
