/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";

const SongContext = createContext();

function SongProvider({ children }) {
  return <SongContext.Provider value={{}}>{children}</SongContext.Provider>;
}

function useSong() {
  const context = useContext(SongContext);
  if (context === undefined) throw new Error("SongContext is used outside of SongProvider");
  return context;
}

export { SongProvider, useSong };
