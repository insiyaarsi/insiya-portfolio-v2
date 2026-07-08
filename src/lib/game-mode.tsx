import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type GameModeContextValue = {
  enabled: boolean;
  toggle: () => void;
  setEnabled: (v: boolean) => void;
  hydrated: boolean;
};

const GameModeContext = createContext<GameModeContextValue | null>(null);
const STORAGE_KEY = "insiya:game-mode";

export function GameModeProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Read persisted state after mount to avoid SSR hydration mismatch
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "1") setEnabled(true);
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    if (enabled) root.classList.add("game-mode");
    else root.classList.remove("game-mode");
    try {
      window.localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
    } catch {
      // ignore
    }
  }, [enabled, hydrated]);

  const toggle = useCallback(() => setEnabled((v) => !v), []);

  return (
    <GameModeContext.Provider value={{ enabled, toggle, setEnabled, hydrated }}>
      {children}
    </GameModeContext.Provider>
  );
}

export function useGameMode() {
  const ctx = useContext(GameModeContext);
  if (!ctx) throw new Error("useGameMode must be used inside GameModeProvider");
  return ctx;
}
