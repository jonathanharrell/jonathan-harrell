export const addAlert = (text, level = 'assertive') => {
  if (level === 'assertive') {
    document.getElementById('alert-assertive').textContent = text
  }

  if (level === 'polite') {
    document.getElementById('alert-polite').textContent = text
  }
}

export const shouldAnimate = () => {
  return (
    typeof window !== 'undefined' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}
