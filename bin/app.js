"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("./middleware/auth");
const path_1 = require("path");
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = require("dotenv");
const shell = require('shelljs');
dotenv_1.config({ path: path_1.resolve(__dirname, './.env') });
// Instantiiate express
const app = express_1.default();
const cors = require('cors');
app.use(cors());
const httpPort = process.env.PORT;
// Register authorization check
// app.use(checkBearer);
// Serve UI
//#region API
app.post('/start', auth_1.checkBearer, (_req, _res) => {
    const success = execShellScript('start');
    _res.status(success ? 200 : 500).send({});
});
app.post('/stop', auth_1.checkBearer, (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    const success = execShellScript('stop');
    _res.status(success ? 200 : 500).send({});
}));
app.post('/update', auth_1.checkBearer, (_req, _res) => {
    const success = execShellScript('update');
    _res.status(success ? 200 : 500).send({});
});
app.post('/login', auth_1.checkBearer, (_req, _res) => {
    _res.status(200).send({});
});
app.use('/', express_1.default.static(path_1.resolve(__dirname, 'ui')));
function execShellScript(scriptName) {
    return shell.exec(`cd scripts && ${scriptName}.sh`).code === 0;
}
//#endregion
let httpServer;
if (process.env.USE_CUSTOM_SSL === 'true') {
    console.log('Using custom ssl');
    const privateKey = fs_1.default.readFileSync(path_1.resolve(__dirname, './ssl/cert.key'));
    const certificate = fs_1.default.readFileSync(path_1.resolve(__dirname, './ssl/cert.cer'));
    httpServer = https_1.default.createServer({
        key: privateKey,
        cert: certificate
    }, app);
}
else {
    httpServer = http_1.default.createServer(app);
}
httpServer.listen(httpPort, () => {
    console.log(`Listening on http://localhost:${httpPort} ...`);
});
//# sourceMappingURL=app.js.map