import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanLeaveWithUnsaved {
  hasUnsavedChanges(): boolean;
}

@Injectable({ providedIn: 'root' })
export class UnsavedChangesGuard implements CanDeactivate<CanLeaveWithUnsaved> {
  canDeactivate(
    component: CanLeaveWithUnsaved
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (component.hasUnsavedChanges()) {
      return confirm('You have unsaved changes. Leave anyway?');
    }
    return true;
  }
}
