import { Component } from '@angular/core';
import { DataLocalService } from '../../services/data-local-service';
import { Registry } from 'src/app/models/registry.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  constructor(public dataLocalService: DataLocalService) { }

  sendEmail() {
    console.log('Send email');
  }

  openRegister(registry: Registry) {
    console.log('open');
    this.dataLocalService.openRegistry(registry);
  }

}
