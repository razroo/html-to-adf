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
