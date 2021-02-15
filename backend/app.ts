import express, { Request, Response } from 'express';
import { checkBearer } from './middleware/auth';
import { resolve } from 'path';
import https from 'https';
import http from 'http';
import fs from 'fs';
import { config } from 'dotenv';
const shell = require('shelljs');

config({ path: resolve(__dirname, './.env') });

// Instantiiate express
const app: express.Express = express();
const cors = require('cors')
app.use(cors());
const httpPort = process.env.PORT;

// Register authorization check
// app.use(checkBearer);

// Serve UI


//#region API
app.post('/start', checkBearer, (_req: Request, _res: Response) => {

});

app.post('/stop', checkBearer, async (_req: Request, _res: Response) => {
    const success: boolean = execShellScript('stop');

    _res.status(success ? 200 : 500).send({});
});

app.post('/restart', checkBearer, (_req: Request, _res: Response) => {
    const success: boolean = execShellScript('stop');

    _res.status(success ? 200 : 500).send({});
});

app.post('/update', checkBearer, (_req: Request, _res: Response) => {
    const success: boolean = execShellScript('stop');

    _res.status(success ? 200 : 500).send({});
});

app.post('/login', checkBearer, (_req: Request, _res: Response) => {
    _res.status(200).send({});
});

app.use('/', express.static(resolve(__dirname, 'ui')))

function execShellScript(scriptName: string): boolean {
    return shell.exec(`cd scripts && ${scriptName}.sh`).code === 0;
}

//#endregion


let httpServer: http.Server;

if (process.env.USE_CUSTOM_SSL === 'true') {
    console.log('Using custom ssl');
    const privateKey = fs.readFileSync(resolve(__dirname, './ssl/cert.key'));
    const certificate = fs.readFileSync(resolve(__dirname, './ssl/cert.cer'));

    httpServer = https.createServer({
        key: privateKey,
        cert: certificate
    }, app);
}
else {
    httpServer = http.createServer(app);
}

httpServer.listen(httpPort, () => {
    console.log(`Listening on http://localhost:${httpPort} ...`);
});