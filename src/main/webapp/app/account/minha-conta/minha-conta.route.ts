import { Route } from '@angular/router';

import { MinhaContaComponent } from '././minha-conta.component';

export const minhaContaRoute: Route = {
  path: 'minha-conta/:telefone',
  component: MinhaContaComponent,
  data: {
    pageTitle: 'Registration',
  },
};
