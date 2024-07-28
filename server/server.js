const express = require('express')
const cors = require('cors')
const serveStatic = require('serve-static')
const cookieParser = require('cookie-parser');

const path = require('path')
const app = express()
const port = 3001
const publicDirectoryPath = path.join(__dirname, 'uploads')

/* Client Routes */
const clientRoutes = require('./routes/nesilRoutes/clientSpaceCreationRoutes')
/* ------------ */

/* Car Routes */
const CarRoutes = require('./routes/clientRoutes/clientAccessRoutes')
/* ------------ */

app.use(cookieParser())
app.use(cors({
	credentials: true,
	origin: true
}))
app.use(express.json())
app.use(serveStatic(publicDirectoryPath))

/* Client Routes */
app.use(clientRoutes)
/* ------------ */

/* Car Routes */
app.use(CarRoutes)
/* ------------ */

app.listen(process.env.PORT || port, () => {
	console.log(`Server is running on port ${port}`)
})