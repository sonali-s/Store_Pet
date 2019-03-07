"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const app_1 = require("./app");
const PORT = 3000;
const server = http.createServer(app_1.default);
server.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});
server.on('error', onError);
// server.on('listening', onListening);
function onError(error) {
    throw error;
}
//# sourceMappingURL=server.js.map