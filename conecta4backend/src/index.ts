import express from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/health", (_, res) => {
  res.json({ ok: true })
})

app.listen(3001, () => {
  console.log("API running on http://localhost:3001")
})