import {convertADFToHtml} from '../adf-to-html';

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
  console.log(result);
  const expected = `<p>test <b>this</b></p>`;
  expect(result).toEqual(expected);
});

it('should convert a paragraph code block thereafter', () => {
  
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
  const result = convertADFToHtml(adfObject);
  const expected = `<p>test <b>this</b></p><code> // hello </code>`;
  expect(result).toEqual(expected);
});

it('should convert a pre tag to code block', () => {
   const AdfObject = {
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
   const result = convertADFToHtml(AdfObject);
   const expected = `<p>test <b>this</b><br></p><code> // hello </code>`;
   expect(result).toEqual(expected);
 });