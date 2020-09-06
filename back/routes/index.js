const express           = require('express');
const router            = express.Router();
const sshClient         = require('../utils/client');

router.post('/', (request, response, next) => {
    console.log(request.body);
    const cmd = request.body.cmd;
    sshClient.execute(cmd).then(data => {
        console.log(data);
        response.send(data);
    }).catch(e => console.error(e));
});

module.exports = router;
