"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const methodOverride = require("method-override");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
exports.default = app;
//# sourceMappingURL=app.js.map