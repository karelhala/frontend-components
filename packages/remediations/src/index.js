
import validate from './validator';
import RemediationWizard, { getMountedInstance } from './RemediationWizard';
export { RemediationWizard };

export function openWizard(data, basePath, wizardRef) {
    const instance = getMountedInstance();

    if (!instance || !wizardRef?.current) {
        throw new Error('Wizard component not mounted');
    }

    validate(data);

    return instance?.openWizard(data, basePath) || wizardRef.current?.openWizard(data, basePath);
}
