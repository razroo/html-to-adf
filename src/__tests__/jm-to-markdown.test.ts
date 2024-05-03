import {convertJiraMarkdownToRegularMarkdown} from "../jm-to-markdown";
import {marked} from 'marked';

describe('jmToMarkdown', () => {
    it('should convert jira markdown to regular markdown', () => {
      const jiraMarkdown = "*Feature*: Convert Jira ticket ADF description to HTML\n\nScenario: User converts Jira ticket ADF to HTML\nGiven that I have a Jira ticket ADF description\nWhen I initiate the conversion process\n  And use the importJiraTicket function\nThen the ADF description is successfully converted to HTML\n\nNotes: \n\n# Will use the function here: [https://github.com/razroo/html-to-adf?tab=readme-ov-file#convertadftohtml|https://github.com/razroo/html-to-adf?tab=readme-ov-file#convertadftohtml|smart-link] \n# Will be within the importJiraTickets function";
      const result = convertJiraMarkdownToRegularMarkdown(jiraMarkdown);
      const html = marked(result);
      const expected = `**Feature**: Convert Jira ticket ADF description to HTML

Scenario: User converts Jira ticket ADF to HTML
Given that I have a Jira ticket ADF description
When I initiate the conversion process
  And use the importJiraTicket function
Then the ADF description is successfully converted to HTML

Notes: 

# Will use the function here: [https://github.com/razroo/html-to-adf?tab=readme-ov-file#convertadftohtml](https://github.com/razroo/html-to-adf?tab=readme-ov-file#convertadftohtml) 
# Will be within the importJiraTickets function`;
      expect(result).toEqual(expected);
    });
})