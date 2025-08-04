import cluster from 'node:cluster';
import http from 'node:http';
import { availableParallelism } from 'node:os';
import process from 'node:process';

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        const worker = cluster.fork();

        // Listen for messages from workers
        worker.on('message', (message) => {
            console.log(`Primary received message from worker ${worker.process.pid}:`, message);
        });
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    http.createServer((req, res) => {
        console.log(`Worker ${process.pid} is processing the request`);
        res.writeHead(200);
        res.end('hello world\n');

        // Send a message to the primary process
        process.send({ workerId: process.pid, message: 'Request processed' });
    }).listen(3000);

    console.log(`Worker ${process.pid} started`);
}