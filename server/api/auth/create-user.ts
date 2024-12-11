import argon2 from 'argon2'

export default defineWrappedResponseHandler(async event =>{
  const { email, password } = await readBody(event)

  if (!email || !password)
    throw createError({ statusCode: 400, message: 'Missing required fields' })
  else if (email.length > 255)
    throw createError({ statusCode: 400, message: 'Email is too long' })
  else if (email.includes(' ') || !email.includes('@'))
    throw createError({ statusCode: 400, message: 'Invalid email' })

  // Check if the user already exists
  const existingUser = await db`SELECT * FROM dd_users WHERE email = ${email}`

  if (existingUser.length > 0)
      return { statusCode: 409, body: { message: 'User already exists' } }

  // Hash the password with Argon2id
  const passwordHash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16, // 64MB memory
      timeCost: 3,         // 3 iterations
      parallelism: 1,      // Single-threaded
  })

  console.log('passwordHash', passwordHash)
  // // Create the user
  // await db`
  //     INSERT INTO dd_users (id, email, password_hash, salt)
  //     VALUES (${email}, ${password}, '')
  // `
})