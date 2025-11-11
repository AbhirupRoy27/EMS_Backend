import bcrypt from 'bcrypt'

export const employeeDataFormatter = async (req) => {
  const { name, email, password, position, department } = req.body
  const hash = await bcrypt.hash(password, 10)
  const data = {
    name: name.trim(),
    email: email,
    password: hash,
    position,
    department,
  }
  return data
}
