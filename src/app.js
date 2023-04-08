import express from "express"
import cors from "cors"
import port from "./constants/port.js"

const app = express();

app.use(cors())
app.use(express.json())


app.listen(port, () => console.log(`Runing in port ${port}`))