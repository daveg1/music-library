export function formatMs(ms: number) {
  const minutes = Math.floor(ms / 1000 / 60);
  const seconds = Math.floor(ms / 1000 - minutes * 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
