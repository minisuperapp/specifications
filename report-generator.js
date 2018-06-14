var reporter = require('cucumber-html-reporter');

var options = {
    theme: 'bootstrap',
    jsonFile: 'cucumber_report.json',
    output: 'cucumber_report.html',
    reportSuiteAsScenarios: true,
    launchReport: false,
    metadata: {
      build: process.env.CIRCLE_BUILD_URL,
      buildNum: process.env.CIRCLE_BUILD_NUM
    }
};

reporter.generate(options);
