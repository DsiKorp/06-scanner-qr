import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, ToastController } from '@ionic/angular';

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
    private navCtrl: NavController
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

  openRegistry(registry: Registry) {
    console.log('Opening registry:', registry);
    this.navCtrl.navigateForward('/tabs/tab2');

    switch (registry.type) {
      case 'http':
        window.open(registry.text, '_blank');
        break;
      case 'geo':
        const [lat, lng] = registry.text.split(',').map(coord => parseFloat(coord.trim()));
        window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:${registry.text}`, '_blank');
        break;
      default:
        console.warn('Unknown registry type:', registry.type);
    }
  }

}
