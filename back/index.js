const express       = require('express');
const http          = require('http');
const cors          = require('cors');
const app           = express();

const indexRouter   = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
        origin: 'http://localhost:4200'
}));

app.use('/api', indexRouter);

http.createServer(app).listen(3000, () => {
        console.log('server listening on *:3000');
});
