import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
//import { RouterEffects } from './router.effects';

@NgModule({
  declarations: [],
  imports: [
    EffectsModule.forRoot([
      AuthEffects,
      // RouterEffects,
    ]),
  ],
  exports: [],
  providers: [],
})
export class AppEffectsModule {}
