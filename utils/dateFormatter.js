export default function dateFormatter(body) {
  if (!body) {
    return 'empty-Body'
  }
  // const date = new Date(body.deadline).toISOString()
  const date = new Date(body.deadline)
  // const currentDate = String(new Date().toISOString())
  const currentDate = new Date()

  if (date < currentDate) return false
  // console.log(date)
  body.deadline = date
  return body
}
