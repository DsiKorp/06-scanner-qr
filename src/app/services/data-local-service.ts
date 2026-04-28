import { Injectable } from '@angular/core';
import { Registry } from '../models/registry.model';

@Injectable({
  providedIn: 'root',
})
export class DataLocalService {

  savedRegistries: Registry[] = [];

  constructor() { }

  saveRegistry(format: string, text: string) {
    const newRegistry = new Registry(format, text);
    this.savedRegistries.unshift(newRegistry);
  }

}
