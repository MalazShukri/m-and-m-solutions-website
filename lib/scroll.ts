const NAVBAR_HEIGHT = 88

export function scrollToSection(targetId: string) {
  if (!targetId || targetId === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" })
    return
  }

  const targetElement = document.getElementById(targetId)
  if (!targetElement) return

  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - NAVBAR_HEIGHT
  window.scrollTo({ top: targetPosition, behavior: "smooth" })
}
