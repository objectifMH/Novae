import { AbstractControl } from '@angular/forms';

export function mdpValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
        const confMDPValue = control.value;
        //console.log("control.value " , confMDPValue);

        const mdpControl = control.root.get('mdpUp');
        //console.log("control.root.get('mdpUp')" , mdpControl);
        if (mdpControl) {
            const mdpValue = mdpControl.value;
            if (mdpValue !== confMDPValue) {
                return {
                    isError: true
                };
            }
        }
    }
    return null;
}