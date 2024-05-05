# Html To ADF
Used to convert from Atlassian Document Format(ADF) and also from 
html to ADF. In addition, allows to convert from Jira Markdown to 
regular markdown. 

# How to install
```
npm install @razroo/html-to-adf --save
```

## HTML to ADF + ADF to HTML

### convertHtmlToADF

```ts
import {convertHtmlToADF} from "@razroo/html-to-adf";

it('should convert a simple paragraph with bold', () => {
  const htmlString = `<p>test <b>this</b></p>`;
  const result = convertHtmlToADF(htmlString);
  const expected = {
    "version": 1,
    "type": "doc",
    "content": [
       {
          "type": "paragraph",
          "content": [
             {
                "type": "text",
                "text": "test ",
                marks: []
             },
             {
                "type": "text",
                "text": "this",
                "marks": [
                   {
                      "type": "strong"
                   }
                ]
             }
          ]
       }
    ]
  }
  console.log(result);
  expect(result).toEqual(expected);
});
```

### convertADFToHtml

```ts
import {convertADFToHtml} from "@razroo/html-to-adf";

it('should convert a simple paragraph with bold', () => {
  const adfObject = {
    "version": 1,
    "type": "doc",
    "content": [
       {
          "type": "paragraph",
          "content": [
             {
                "type": "text",
                "text": "test ",
                marks: []
             },
             {
                "type": "text",
                "text": "this",
                "marks": [
                   {
                      "type": "strong"
                   }
                ]
             }
          ]
       }
    ]
  }
  const result = convertADFToHtml(adfObject);
  const expected = `<p>test <b>this</b></p>`;
  expect(result).toEqual(expected);
});
```

## Convert Jira Markdown to Markdown or HTML

### Convert Jira Markdown to Markdown
```ts
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
```

### Convert Jira Markdown to HTML
```ts
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
```