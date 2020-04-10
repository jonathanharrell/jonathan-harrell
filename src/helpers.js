export const addAlert = text => {
  document.getElementById('alert').textContent = text
}

export const shouldAnimate = () => {
  return (
    typeof window !== 'undefined' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}
