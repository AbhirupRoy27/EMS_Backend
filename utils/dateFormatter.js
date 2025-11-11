export default function dateFormatter({ task }) {
  const date = new Date(task.deadline).toISOString()
  // console.log(deadline, task)
  task.deadline = date
  return task
}
