package com.bingodelivery.spec;

import static cucumber.api.SnippetType.CAMELCASE;

import cucumber.api.CucumberOptions;
import cucumber.api.junit.Cucumber;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
        plugin = { "junit:output" },
        snippets = CAMELCASE,
        glue = { "com.bingodelivery.spec" },
        features = { "src/features/" },
        monochrome = true)
public class TestFeatures
{
}
