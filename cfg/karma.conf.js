module.exports = function(config) {
    var isDebug = process.argv.some((x) => x === '--debug');
    var reporters = isDebug ? ['kjhtml', 'karma-typescript'] : ['progress', 'junit', 'karma-typescript'];
    var paths = require('./paths.config');

    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '..',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: [
            'jasmine',
            'karma-typescript'
        ],

        // list of files / patterns to load in the browser
        files: [
            'src/**/*.ts'
        ],

        // list of files to exclude
        exclude: [
            'src/**/*.d.ts'
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/**/*.ts': ['karma-typescript']
        },

        // Additional mime types
        mime: {
            'text/x-typescript': ['ts']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: reporters,

        // the default configuration
        junitReporter: {
            outputDir: paths.reports,
            useBrowserName: false,
            outputFile: 'junit/report.xml'
        },

        // Configuration file for typescript.
        karmaTypescriptConfig: {
            tsconfig: 'tsconfig.json',

            coverageOptions: {
                instrumentation: !isDebug,
                exclude: [
                    /\.(d|spec|test)\.ts$/i
                ]
            },

            reports: {
                'cobertura': {
                    directory: paths.coverage,
                    subdirectory: 'cobertura',
                    filename: 'coverage.xml'
                },
                'html': {
                    directory: paths.coverage,
                    subdirectory: '.'
                },
                'text-summary': null
            }
        },

        // The timeout to wait for a connection from the browser before failing
        // The default is 10 seconds, but that may be too short for heavy load
        // on a CI server, so we're increasing it to a minute here.
        captureTimeout: 60000,
        browserDisconnectTimeout: 60000,
        browserDisconnectTolerance: 10,
        browserNoActivityTimeout: 60000,

        // web server port
        port: 8081,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: !isDebug
    });
};
