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
        "type": "codeBlock",
        attrs: {},
        "content": [
           {
              marks: [],
              "type": "text",
              "text": " // hello "
           }
        ]
     }
    ]
  }
  expect(result).toEqual(expected);
});

it('should convert a pre tag to code block', () => {
   const htmlString = `<p>test <b>this</b><br></p>
 <pre> // hello </pre>  
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
              },
              {
               "type": "hardBreak"
             }
           ]
        },
        {
         "type": "codeBlock",
         attrs: {},
         "content": [
            {
               marks: [],
               "type": "text",
               "text": " // hello "
            }
         ]
      }
     ]
   }
   expect(result).toEqual(expected);
 });