import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { PefilComponent } from './pefil.component';

describe('PefilComponent', () => {
  let spectator: Spectator<PefilComponent>;
  const createComponent = createComponentFactory(PefilComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
