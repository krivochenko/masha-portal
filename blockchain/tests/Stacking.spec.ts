import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { Stacking } from '../wrappers/Stacking';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('Stacking', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Stacking');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let stacking: SandboxContract<Stacking>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        stacking = blockchain.openContract(Stacking.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await stacking.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: stacking.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and stacking are ready to use
    });
});
