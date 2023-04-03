// from seconds to hh:ss format like 00:00
export function formatTime(time: number): string {
  let minutes = Math.floor(time / 60)
  let seconds = time - minutes * 60
  return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
}

export const sleep = m => new Promise(r => setTimeout(r, m))
