var reporter = require('cucumber-html-reporter');

var options = {
    theme: 'bootstrap',
    jsonFile: 'results/cucumber_report.json',
    output: `${process.env.CIRCLE_ARTIFACTS || 'results'}/cucumber_report.html`,
    reportSuiteAsScenarios: true,
    launchReport: false,
    metadata: {}
};

reporter.generate(options);
