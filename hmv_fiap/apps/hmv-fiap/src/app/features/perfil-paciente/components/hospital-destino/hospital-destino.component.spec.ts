import { Component } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';

import { HospitalDestinoComponent } from './hospital-destino.component';

@Component({ template: '' })
class CustomHostComponent {
  title = 'Custom HostComponent';
}

describe('HospitalDestinoComponent', () => {
  let host: SpectatorHost<HospitalDestinoComponent, CustomHostComponent>;
  const createHost = createHostFactory({
    component: HospitalDestinoComponent,
    host: CustomHostComponent
  });

  it('should display the host component title', () => {
    host = createHost(`<zippy [title]="title"></zippy>`);
    expect(host.query('.zippy__title')).toHaveText('Custom HostComponent');
  });
});
