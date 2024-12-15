import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  try {
    const { email, password } = await readBody(event)
    const { JWT_SECRET } = useRuntimeConfig()

    // Validate input
    if (!email || !password) {
      throw createError({ statusCode: 400, message: 'Email and password are required.' })
    }

    // Fetch the user from the database
    const [user] = await db`SELECT * FROM dd_users WHERE email = ${email}`
    if (!user)
      throw createError({ statusCode: 401, message: 'Invalid email or password.' })

    // Verify the password
    const isPasswordValid = await argon2.verify(user.password_hash, password)
    if (!isPasswordValid)
      throw createError({ statusCode: 401, message: 'Invalid email or password.' })

    // Generate a JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '365d' }
    )

    // Set the JWT as a secure HTTP-only cookie
    setCookie(event, 'auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'Strict',
      maxAge: 60 * 60, // 1 hour
    })

    // Respond with success
    return { success: true, message: 'Login successful' }
  } catch (error) {
    // Handle errors gracefully
    console.error('Login error:', error)
    throw createError({ statusCode: error.statusCode || 500, message: error.message || 'Internal server error.' })
  }
})
