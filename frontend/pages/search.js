import { SearchLayout } from "../components/layouts/index";
import React, { useEffect } from "react";
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

export default function Search() {
  const [mode, setMode] = useStickyState("light", "theme");

  useEffect(() => {
    document.body.dataset.theme = mode;
  }, [mode]);

  return (
    <div>
      <SearchLayout setMode={setMode} />
    </div>
  );
}
