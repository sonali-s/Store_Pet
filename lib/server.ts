import * as http from "http";
import app from "./app";

const PORT = 3000;

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});
server.on('error', onError);
// server.on('listening', onListening);

function onError(error: NodeJS.ErrnoException): void {
    throw error;
}
