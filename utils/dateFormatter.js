export default function dateFormatter(body) {
  const date = new Date(body.deadline).toISOString()
  // console.log(date)
  body.deadline = date
  return body
}
