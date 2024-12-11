export default defineWrappedResponseHandler(async event =>{
  const body = await readBody(event)

  const secret = await db`
    INSERT INTO secrets (secret)
    VALUES (${body.secret})
    RETURNING *
  `

  console.log('secret', secret)
})