import { createContext, useEffect, useState } from "react";

interface PreferenceValues {
  theme: "light" | "dark" | "device";
}

interface PreferenceActions {
  setTheme: (theme: PreferenceValues["theme"]) => void;
}

type Preference = PreferenceValues & PreferenceActions;

const defaultValue: Preference = {
  theme: "device",

  setTheme: () => {},
};

const PreferenceContext = createContext<Preference>(defaultValue);

export function PreferenceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [preference, setPreference] = useState<PreferenceValues>(defaultValue);

  // localStorage에서 preference를 가져옴
  useEffect(() => {
    const preference = localStorage.getItem("preference");
    if (preference === null) return;

    setPreference(JSON.parse(preference));
  }, []);

  // preference가 변경되면 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("preference", JSON.stringify(preference));
  }, [preference]);

  function setTheme(theme: PreferenceValues["theme"]) {
    setPreference((prev) => ({ ...prev, theme }));
  }

  return (
    <PreferenceContext.Provider
      value={{
        ...preference,
        setTheme,
      }}
    >
      {children}
    </PreferenceContext.Provider>
  );
}

export default PreferenceContext;
