import express from 'express';

const app = express()
const port = process.env.PORT || 8001
app.listen(port, (req, res)=> {
    console.log(`Listening on port ${port}`)
})