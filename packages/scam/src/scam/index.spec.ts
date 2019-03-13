import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';


const collectionPath = path.join(__dirname, '../collection.json');


describe('scam', () => {

    let appTree: Tree;

    beforeEach(() => {

        const workspaceOptions = {
            name: 'workspace',
            newProjectRoot: 'projects',
            version: '6.0.0',
        };

        const appOptions = {
            name: 'bar',
            inlineStyle: false,
            inlineTemplate: false,
            routing: false,
            skipTests: false,
            skipPackageJson: false,
        };
        const schematicRunner = new SchematicTestRunner(
            '@schematics/angular',
            require.resolve('@schematics/angular/collection.json'),
        );
        appTree = schematicRunner.runSchematic('workspace', workspaceOptions);
        appTree = schematicRunner.runSchematic('application', appOptions, appTree);

    });

    it('should create a module with a component in the same directory', () => {

        const runner = new SchematicTestRunner('schematics', collectionPath);

        runner.runSchematic('scam', {
            name: 'hello-world',
            project: 'app'
        }, appTree);

        // expect(tree.files).toContain('/hello-world/hello-world.component.ts');
        // expect(tree.files).toContain('/hello-world/hello-world.module.ts');

    });

});
