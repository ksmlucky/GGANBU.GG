import { RecommandResultLayout } from "../components/layouts/index";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const queries = router.query; // 전달받은 쿼리 내용

  useEffect(() => {
    if (!router.isReady) return;
    console.log(queries);
  }, [router.isReady]);

  useEffect(() => {
    document.body.dataset.theme = mode;
  }, [mode]);

  return (
    <>
      <RecommandResultList setMode={setMode}></RecommandResultList>
    </>
  );
}
