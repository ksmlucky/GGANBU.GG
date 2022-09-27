import { DetailResultLayout } from "../../components/layouts/index";
import React, { useEffect } from "react";
// app
//import

import DetailChampion from "../../components/detailChampion/Detailchampion";

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

export default function DetailResult() {
  const [mode, setMode] = useStickyState("dark", "theme");

  useEffect(() => {
    document.body.dataset.theme = mode;
  }, [mode]);

  return (
    <div>
      <DetailChampion setMode={setMode} mode={mode}/>
    </div>
  );
}
