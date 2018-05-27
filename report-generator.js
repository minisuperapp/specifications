var reporter = require('cucumber-html-reporter');

var options = {
    theme: 'bootstrap',
    jsonFile: 'results/cucumber_report.json',
    output: 'results/cucumber_report.html',
    reportSuiteAsScenarios: true,
    launchReport: false,
    metadata: {}
};

reporter.generate(options);
