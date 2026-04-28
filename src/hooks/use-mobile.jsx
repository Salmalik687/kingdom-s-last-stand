import * as React from "react"

const MOBILE_BREAKPOINT = 768

// Synchronously evaluate at construction time so the first paint is correct.
// Previously initialized to `undefined` (then coerced via `!!isMobile` to false),
// which gave mobile users a desktop-layout flash on first paint.
function getInitial() {
  if (typeof window === "undefined") return false;
  if (typeof window.matchMedia !== "function") {
    return window.innerWidth < MOBILE_BREAKPOINT;
  }
  return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches;
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(getInitial)

  React.useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange);
  }, [])

  return isMobile
}
