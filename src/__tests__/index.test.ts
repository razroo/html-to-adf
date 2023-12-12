import {convertHtmlToADF} from '../html-to-adf';

it('works sir', () => {
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
  expect(result).toEqual(expected);
});
