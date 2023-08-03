import { FormControl } from '@angular/forms';

export const testValidator = (
  control: FormControl
): { [key: string]: boolean } | null => {
  if (control.value?.toLowerCase() == 'test')
    return {
      testProject: true,
    };

  return null;
};
