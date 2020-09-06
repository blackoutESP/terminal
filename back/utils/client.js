const logger        = require('../logger/logger');
const client        = require('ssh2').Client;
let buffer;

module.exports = {
        execute: (cmd) => {
                return new Promise((resolve, reject) => {
                        let connection = new client();
                        connection.on('ready', () => {
                                connection.exec(cmd, { pty: true }, (error, stream) => {
                                        if(error){
                                                console.error(error);
                                                logger.error(error);
                                        }
                                        stream.on('data', (data) => {
                                                buffer = Buffer.concat([data]);
                                                resolve(buffer.toString('utf-8'));
                                        });
                                        stream.stderr.on('data', (data) => {
                                                console.log('error: ');
                                                console.log(data);
                                        });
                                });
                                // connection.shell((error, stream) => {
                                //         if(error){
                                //                 console.error(error);
                                //                 logger.error(error);
                                //         }
                                //         stream.on('close', () => {
                                //                 connection.end();    
                                //         });
                                //         stream.on('data', (data) => {
                                //                 buffer = Buffer.concat([data]);
                                //                 console.log(buffer.toString('utf8'));
                                //                 resolve(buffer.toString('utf8'));
                                //         });
                                //         stream.end(`${cmd}\n`);
                                // });
                        }).connect({
                                host: '172.16.89.128',
                                port: 22,
                                username: 'ubuntu',
                                password: 'ubuntu'
                        });
                });
        }
};
