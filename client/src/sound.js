export default function playSound(sound) {
  const audio = new Audio(sound)
  audio.play()
}
