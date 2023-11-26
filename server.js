const express = require("express")
const handleError = require("./Middleware/handleError");
const {connect, connection} = require("mongoose");
const connectionDb = require("./config/dbConnections");
const dotenv = require("dotenv").config()

connectionDb();
const app = express()
const port = process.env.PORT || 5000

//Routes
app.use(express.json())
app.use("/api/contacts",require("./routes/contactsRoutes"))
app.use("/api/users",require("./routes/userRoutes"))
app.use(handleError)

app.listen(port,()=>{
    console.log(`Server Running on Port ${port}`)
})
