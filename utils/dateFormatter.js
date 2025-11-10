export default function dateFormatter({ deadline }) {
  const date = new Date(deadline).toISOString()
  return date
}
