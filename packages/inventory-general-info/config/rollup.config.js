/* eslint-disable camelcase */
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import nodeGlobals from 'rollup-plugin-node-globals';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';
import { dependencies, peerDependencies, name } from '../package.json';
import {
    rollupConfig,
    externalDeps,
    external,
    globals
} from '../../../config/rollup-contants';

const commonjsOptions = {
    ignoreGlobal: true,
    include: /node_modules/,
    namedExports: {
        '../../node_modules/@patternfly/react-table/node_modules/lodash/lodash.js': [
            'mergeWith',
            'isFunction',
            'isArray',
            'isEqualWith',
            'isEqual'
        ]
    }
};

const babelOptions = {
    exclude: /node_modules/,
    runtimeHelpers: true,
    configFile: './babel.config'
};

const plugins = [
    nodeResolve(),
    babel(babelOptions),
    commonjs(commonjsOptions),
    nodeGlobals(),
    terser({
        keep_classnames: true,
        keep_fnames: true
    }),
    postcss({
        extract: true
    }),
    json()
];

export default rollupConfig(
    external(externalDeps({ ...dependencies, ...peerDependencies })),
    plugins,
    globals,
    name,
    [{
        index: 'src/index.js',
        TextInputModal: 'src/TextInputModal.js',
        systemProfileStore: 'src/redux/reducers.js',
        actionTypes: 'src/redux/action-types',
        actions: 'src/redux/actions.js',
        GeneralInformation: 'src/GeneralInformation.js'
    }, {
        index: 'src/index.js',
        TextInputModal: 'src/TextInputModal.js'
    }],
    './'
);
