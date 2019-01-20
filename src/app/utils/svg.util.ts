import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

export const loadSvgResources = (ir: MatIconRegistry, ds: DomSanitizer) => {
  const imgDir = 'assets/svg';
  const iconDir = `${imgDir}/icon`;
  const avatarDir = `${imgDir}/avatars`;
  ir.addSvgIconSetInNamespace('avatars', ds.bypassSecurityTrustResourceUrl(`${avatarDir}/avatars.svg`));
  ir.addSvgIcon('night', ds.bypassSecurityTrustResourceUrl(`${iconDir}/night.svg`));
}
