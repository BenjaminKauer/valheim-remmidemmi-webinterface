"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBearer = void 0;
const dotenv_1 = require("dotenv");
const path_1 = require("path");
dotenv_1.config({ path: path_1.resolve(__dirname, '../.conf') });
const checkBearer = (req, res, next) => {
    console.log('checkbearer');
    const authenticated = !!req.headers['authorization'] && req.headers['authorization'] === Buffer.from(process.env.PASSWORD).toString('base64');
    if (authenticated) {
        next();
        return;
    }
    // decline
    res.status(401)
        .send('Unauthorized');
};
exports.checkBearer = checkBearer;
//# sourceMappingURL=auth.js.map