export const dataAdded = (res, updated) => {
  res.status(200).json({
    status: true,
    message: 'Employee Added!',
    data: updated,
  })
}

export const defaultError = (res, error) => {
  res.status(404).json({
    status: false,
    error: error.name,
    message: error.message,
  })
}
