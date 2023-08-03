import { Observable } from 'rxjs';
import { AbstractControl, FormControl } from '@angular/forms';

export const emailValidator = (
  control: AbstractControl
): Promise<any> | Observable<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (control.value?.includes('@test.com'))
        return resolve({ testEmail: true });
      resolve(null);
    });
  });
};
