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

it('should convert jira markdown with special curly braces to markdown', () => {
  const jiraMarkdown = "{noformat}Scenario Charlie Greenman would like to apply to 20 remote Angular contract roles\n  Given It is a LinkedIn job post\n    And It is remote\n    And It is a contract job\n  When it is Easy Apply\n  Then I should apply to it\n    And should use the existing resume{noformat}\n\nNotes\n\n# For now we will only apply to roles if they are remote, a contract and angular roles.\n## Can use this URL [https://www.linkedin.com|https://www.linkedin.com]\n# If asks for a cover letter, no need to supply one(just the resume)\n## Charlie Greenman’s resume if need it [https://drive.google.com|https://drive.google.com|smart-link] "
  const result = convertJiraMarkdownToRegularMarkdown(jiraMarkdown);
  const expected = `\`\`\`Scenario Charlie Greenman would like to apply to 20 remote Angular contract roles
  Given It is a LinkedIn job post
    And It is remote
    And It is a contract job
  When it is Easy Apply
  Then I should apply to it
    And should use the existing resume\`\`\`

Notes

1. For now we will only apply to roles if they are remote, a contract and angular roles.
   1. Can use this URL [https://www.linkedin.com](https://www.linkedin.com)
1. If asks for a cover letter, no need to supply one(just the resume)
   1. Charlie Greenman’s resume if need it [https://drive.google.com](https://drive.google.com) `;
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

  it('should convert jira markdown to html if contains code as well', async() => {
    const jiraMarkdown = "{noformat}Scenario Charlie Greenman would like to apply to 20 remote Angular contract roles\n  Given It is a LinkedIn job post\n    And It is remote\n    And It is a contract job\n  When it is Easy Apply\n  Then I should apply to it\n    And should use the existing resume{noformat}\n\nNotes\n\n# For now we will only apply to roles if they are remote, a contract and angular roles.\n## Can use this URL [https://www.linkedin.com|https://www.linkedin.com]\n# If asks for a cover letter, no need to supply one(just the resume)\n## Charlie Greenman’s resume if need it [https://drive.google.com|https://drive.google.com|smart-link] ";
    const result = await convertJiraMarkdownToHtml(jiraMarkdown);
    const expected = `<pre><code>Scenario Charlie Greenman would like to apply to 20 remote Angular contract roles
  Given It is a LinkedIn job post
    And It is remote
    And It is a contract job
  When it is Easy Apply
  Then I should apply to it
    And should use the existing resume
</code></pre>
<p>Notes</p>
<ol>
<li>For now we will only apply to roles if they are remote, a contract and angular roles.<ol>
<li>Can use this URL <a href="https://www.linkedin.com">https://www.linkedin.com</a></li>
</ol>
</li>
<li>If asks for a cover letter, no need to supply one(just the resume)<ol>
<li>Charlie Greenman’s resume if need it <a href="https://drive.google.com">https://drive.google.com</a></li>
</ol>
</li>
</ol>
`;
    expect(result).toEqual(expected);
    expect(result).toEqual(expected);
  });
})
    
})