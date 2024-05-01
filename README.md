# Html To ADF
Used to convert Atlassian Document Format from ADF to html and also from 
html to adf

# How to install
```
npm install @razroo/html-to-adf --save
```

## Two main functions

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