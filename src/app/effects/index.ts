import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
@NgModule({
  declarations: [],
  imports: [
    EffectsModule.forRoot([
      AuthEffects,
    ]),
  ],
  exports: [],
  providers: [],
})
export class AppEffectsModule {}
