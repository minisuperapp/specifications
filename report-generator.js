var reporter = require('cucumber-html-reporter');

var options = {
    theme: 'bootstrap',
    jsonFile: 'results/cucumber_report.json',
    output: 'results/cucumber_report.html',
    reportSuiteAsScenarios: true,
    launchReport: false,
    metadata: {
      build: process.env.CIRCLE_BUILD_URL,
      buildNum: process.env.CIRCLE_BUILD_NUM
    }
};

reporter.generate(options);
