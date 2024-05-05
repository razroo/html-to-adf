import {convertJiraMarkdownToRegularMarkdown, convertJiraMarkdownToHtml} from "../jm-to-markdown";

describe('jmToMarkdown', () => {
    describe('convertJiraMarkdownToRegularMarkdown', () => {
it('should convert jira markdown to regular markdown', () => {
    const jiraMarkdown = "*Feature*: Convert Jira ticket ADF description to HTML\n\nScenario: User converts Jira ticket ADF to HTML\nGiven that I have a Jira ticket ADF description\nWhen I initiate the conversion process\n  And use the importJiraTicket function\nThen the ADF description is successfully converted to HTML\n\nNotes: \n\n# Will use the function here: [https://github.com/razroo/html-to-adf?tab=readme-ov-file#convertadftohtml|https://github.com/razroo/html-to-adf?tab=readme-ov-file#convertadftohtml|smart-link] \n# Will be within the importJiraTickets function";
    const result = convertJiraMarkdownToRegularMarkdown(jiraMarkdown);
    const expected = `**Feature**: Convert Jira ticket ADF description to HTML

Scenario: User converts Jira ticket ADF to HTML
Given that I have a Jira ticket ADF description
When I initiate the conversion process
  And use the importJiraTicket function
Then the ADF description is successfully converted to HTML

Notes: 

1. Will use the function here: [https://github.com/razroo/html-to-adf?tab=readme-ov-file#convertadftohtml](https://github.com/razroo/html-to-adf?tab=readme-ov-file#convertadftohtml) 
1. Will be within the importJiraTickets function`;
expect(result).toEqual(expected);
});
});

describe('convertJiraMarkdownToHtml', () => {
  it('should convert jira markdown to html', async() => {
    const jiraMarkdown = "*Feature*: Convert Jira ticket ADF description to HTML\n\nScenario: User converts Jira ticket ADF to HTML\nGiven that I have a Jira ticket ADF description\nWhen I initiate the conversion process\n  And use the importJiraTicket function\nThen the ADF description is successfully converted to HTML\n\nNotes: \n\n# Will use the function here: [https://github.com/razroo/html-to-adf?tab=readme-ov-file#convertadftohtml|https://github.com/razroo/html-to-adf?tab=readme-ov-file#convertadftohtml|smart-link] \n# Will be within the importJiraTickets function";
    const result = await convertJiraMarkdownToHtml(jiraMarkdown);
    const expected = `<p><strong>Feature</strong>: Convert Jira ticket ADF description to HTML</p>
<p>Scenario: User converts Jira ticket ADF to HTML
Given that I have a Jira ticket ADF description
When I initiate the conversion process
  And use the importJiraTicket function
Then the ADF description is successfully converted to HTML</p>
<p>Notes: </p>
<ol>
<li>Will use the function here: <a href="https://github.com/razroo/html-to-adf?tab=readme-ov-file#convertadftohtml">https://github.com/razroo/html-to-adf?tab=readme-ov-file#convertadftohtml</a> </li>
<li>Will be within the importJiraTickets function</li>
</ol>
`;
    expect(result).toEqual(expected);
  });
})
    
})