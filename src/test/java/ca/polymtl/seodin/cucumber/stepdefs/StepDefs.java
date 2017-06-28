package ca.polymtl.seodin.cucumber.stepdefs;

import ca.polymtl.seodin.SeodinApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = SeodinApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
