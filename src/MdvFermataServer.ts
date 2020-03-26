import * as bodyParser from 'body-parser';
import * as middlewares from './middlewares';

import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';

// tslint:disable: no-console
class MdvFermataServer extends Server {

    private readonly SERVER_STARTED = 'MDV Fermata Server started on port: ';

    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
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
        const mockAPI = new middlewares.MockAPI();
        const telegramAPI = new middlewares.TelegramAPI();
        telegramAPI.init();
        console.log('API CALL SAYS:',mockAPI.sendRequest());
        // console.log('API CALL SAYS:',telegramAPI.sendRequest());
    }
}

export default MdvFermataServer;