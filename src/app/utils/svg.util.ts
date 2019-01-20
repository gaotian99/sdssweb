import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

export const loadSvgResources = (ir: MatIconRegistry, ds: DomSanitizer) => {
  const imgDir = 'assets/svg';
  const sidebarDir = '${imgDir}/sidebar';
  //ir.addSvgIcon('dev', ds.bypassSecurityTrustResourceUrl('${imgDir}/dev.svg'));
}
