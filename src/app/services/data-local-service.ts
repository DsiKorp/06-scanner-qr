import { Injectable } from '@angular/core';
import { Registry } from '../models/registry.model';

@Injectable({
  providedIn: 'root',
})
export class DataLocalService {

  savedRegistries: Registry[] = [];

}
