import { ChooseChampionLayout } from "../components/layouts/index";
import React, { useEffect } from "react";
//import
import ChooseChampion from "../components/chooseChampion/CChampion";
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

export default function Recommand() {
  const [mode, setMode] = useStickyState("dark", "theme");

  useEffect(() => {
    document.body.dataset.theme = mode;
  }, [mode]);

  return (
    <>
      <ChooseChampion setMode={setMode}></ChooseChampion>
    </>
  );
}
