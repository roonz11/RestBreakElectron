import { Injectable } from '@angular/core';
const electron = require('electron');

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor() {
        electron.ipcRenderer.on('showNotificaiton', (event: any, result: any) => {
            console.log('yo yo yo', result);
        });
    }

    public showRestNotification () {
        console.log('take rest');
    }
}
