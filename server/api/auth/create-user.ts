import jwt from 'jsonwebtoken';
import argon2 from 'argon2';

export default defineWrappedResponseHandler(async (event) => {
  const { email, password } = await readBody(event);
  const { JWT_SECRET } = useRuntimeConfig()

  if (!email || !password) {
    throw createError({ statusCode: 400, message: 'Missing required fields' });
  } else if (email.length > 255) {
    throw createError({ statusCode: 400, message: 'Email is too long' });
  } else if (email.includes(' ') || !email.includes('@')) {
    throw createError({ statusCode: 400, message: 'Invalid email' });
  }

  // Check if the user already exists
  const existingUser = await db`SELECT * FROM dd_users WHERE email = ${email}`;
  if (existingUser.length > 0) {
    throw createError({ statusCode: 400, message: 'Invalid request. Please try again.' });
  }

  // Hash the password with Argon2id
  const passwordHash = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16, // 64MB memory
    timeCost: 3,         // 3 iterations
    parallelism: 1,      // Single-threaded
  });

  // Create the user
  await db`
      INSERT INTO dd_users (email, password_hash)
      VALUES (${email}, ${passwordHash})
  `;

  // Generate a JWT
  const token = jwt.sign(
    { email },               // Payload
    JWT_SECRET,  // Secret key (store securely in env vars)
    { expiresIn: '1h' }      // Token expires in 1 hour
  );

  // Set the token as a secure cookie
  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict', // Or 'Lax' depending on your CSRF strategy
    maxAge: 60 * 60,    // 1 hour
  });

  return { message: 'Signup successful!' };
});
