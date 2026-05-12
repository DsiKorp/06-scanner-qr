import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, ToastController } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

import { Registry } from '../models/registry.model';

@Injectable({
  providedIn: 'root',
})
export class DataLocalService {

  savedRegistries: Registry[] = [];
  private _storage: Storage | null = null;

  constructor(
    private storage: Storage,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private inAppBrowser: InAppBrowser,
    private file: File,
  ) {
    this.init();
    this.loadRegistries();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }


  async saveRegistry(format: string, text: string) {
    await this.loadRegistries();

    const newRegistry = new Registry(format, text);
    this.savedRegistries.unshift(newRegistry);
    console.log('Registry saved:', newRegistry);
    console.log(this.savedRegistries);

    this.storage.set('registries', this.savedRegistries);
    this.presentToast('Registry saved successfully!');
    this.openRegistry(newRegistry);
  }

  async loadRegistries(): Promise<Registry[]> {
    const registries = await this.storage.get('registries');
    this.savedRegistries = registries || [];

    return this.savedRegistries;
  }

  async presentToast(message: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'top',
      color: 'primary'
    });
    toast.present();
  }

  sendEmail() {

  }

  openRegistry(registry: Registry) {
    console.log('Opening registry:', registry);
    this.navCtrl.navigateForward('/tabs/tab2');

    switch (registry.type) {
      case 'url':
        this.inAppBrowser.create(registry.text, '_system'); // _system
        break;
      case 'geo':
        //const [lat, lng] = registry.text.split(',').map(coord => parseFloat(coord.trim()));
        //this.inAppBrowser.create(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
        this.navCtrl.navigateForward(`/tabs/tab2/map/${registry.text}`);
        break;
      case 'email':
        this.inAppBrowser.create(`mailto:${registry.text}`, '_blank');
        break;
      default:
        console.warn('Unknown registry type:', registry.type);
    }
  }

  enviarCorreo() {

    const arrTemp = [];
    const titulos = 'Tipo, Formato, Creado en, Texto\n';

    arrTemp.push(titulos);

    this.savedRegistries.forEach(registro => {

      const linea = `${registro.type}, ${registro.format}, ${registro.created}, ${registro.text.replace(',', ' ')}\n`;

      arrTemp.push(linea);

    });

    this.crearArchivoFisico(arrTemp.join(''));

  }

  crearArchivoFisico(text: string) {

    // this.file.checkFile( this.file.dataDirectory, 'registros.csv' )
    //   .then( existe => {
    //     console.log('Existe archivo?', existe );
    //     return this.escribirEnArchivo( text );
    //   })
    //   .catch( err => {

    //     return this.file.createFile( this.file.dataDirectory, 'registros.csv', false )
    //             .then( creado => this.escribirEnArchivo( text ) )
    //             .catch( err2 => console.log( 'No se pudo crear el archivo', err2 ));

    //   });


  }

  // async escribirEnArchivo( text: string ) {

  //   await this.file.writeExistingFile( this.file.dataDirectory, 'registros.csv', text );

  //   const archivo = `${this.file.dataDirectory}/registros.csv`;
  //   // console.log(this.file.dataDirectory + 'registros.csv');

  //   const email = {
  //     to: 'fernando.herrera85@gmail.com',
  //     // cc: 'erika@mustermann.de',
  //     // bcc: ['john@doe.com', 'jane@doe.com'],
  //     attachments: [
  //       archivo
  //     ],
  //     subject: 'Backup de scans',
  //     body: 'Aquí tienen sus backups de los scans - <strong>ScanApp</strong>',
  //     isHtml: true
  //   };

  //   // Send a text message using default options
  //   this.emailComposer.open(email);

  // }


}
