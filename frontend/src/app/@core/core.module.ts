import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbAuthModule, NbDummyAuthStrategy } from '@nebular/auth';
import { throwIfAlreadyLoaded } from './module-import.guard';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf, Observable } from 'rxjs';
import {
  // AnalyticsService,
  // PlayerService,
  // StateService,
  LayoutService } from './utils';

export interface SocialLink {
  url: string;
  target: string;
  icon: string;
}

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole(): Observable<string> {
    return observableOf('guest');
  }
}

const socialLinks: SocialLink[] = [
  {
    url: 'https://github.com/48479567',
    target: '_blank',
    icon: 'github'
  }
];

export const NB_CORE_PROVIDERS = [
  NbAuthModule.forRoot({
    strategies: [
      NbDummyAuthStrategy.setup({
        name: 'email',
        delay: 3000,
      }),
    ],
    forms: {
      login: {
        socialLinks,
      },
      register: {
        socialLinks,
      },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  // AnalyticsService,
  LayoutService,
  // PlayerService,
  // StateService,

];


@NgModule({
  imports: [
    CommonModule,

  ],
  exports: [
    NbAuthModule,

  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,

      ],
    } as ModuleWithProviders;
  }
}

