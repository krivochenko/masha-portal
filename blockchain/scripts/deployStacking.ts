import { toNano } from '@ton/core';
import { Stacking } from '../wrappers/Stacking';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const stacking = provider.open(Stacking.createFromConfig({}, await compile('Stacking')));

    await stacking.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(stacking.address);

    // run methods on `stacking`
}
