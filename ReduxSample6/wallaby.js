module.exports = function (wallaby) {
    return {
        files: [
            'src/**/*.ts?(x)',
            'src/**/*.snap',
            '!src/**/*.spec.ts?(x)'
        ],

        env: {
            type: 'node',
            runner: 'node'
        },

        tests: [
            'src/**/*.spec.tsx'
            //"dist/components/__tests__/*.js"
        ],

        "testFramework": "jest"
    };
};