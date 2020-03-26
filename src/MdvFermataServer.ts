import * as bodyParser from 'body-parser';
import * as middlewares from './middlewares';

import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { MockAPI, TelegramAPI } from './middlewares';

// tslint:disable: no-console
class MdvFermataServer extends Server {

    private readonly SERVER_STARTED = 'MDV Fermata Server started on port: ';
    private mockAPI:MockAPI;
    private telegramAPI:TelegramAPI;

    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.mockAPI = new middlewares.MockAPI();
        this.telegramAPI = new middlewares.TelegramAPI();
    }

    public start(port: number): void {
        this.app.get('*', (req, res) => {
            res.send(this.SERVER_STARTED + port);
        });
        this.app.listen(port, () => {
            Logger.Imp(this.SERVER_STARTED + port);
        });
    }
    public makeApiCall():void{
        this.telegramAPI.init();
        console.log('API CALL SAYS:',this.mockAPI.sendRequest());
    }
}

export default MdvFermataServer;