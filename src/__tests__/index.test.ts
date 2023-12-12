import {convertHtmlToADF} from '../html-to-adf';

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

it('should convert a paragraph code block thereafter', () => {
  const htmlString = `<p>test <b>this</b></p>
<code> // hello </code>  
  `;
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
       },
       {
        "type": "paragraph",
        "content": [
           {
              "type": "text",
              "text": " // hello ",
              "marks": [
                 {
                    "type": "code"
                 }
              ]
           }
        ]
     }
    ]
  }
  expect(result).toEqual(expected);
});