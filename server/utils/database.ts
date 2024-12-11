import postgres from "postgres"

export const db = (() => {
  if (!process.env.DATABASE_URL)
    throw new Error("DATABASE_URL is not defined in environment variables.")

  const isProduction = process.env.NODE_ENV === "production"

  return postgres(process.env.DATABASE_URL, {
    ssl: { rejectUnauthorized: false }, // Accept all SSL certificates (unsecure)
  })
})()
