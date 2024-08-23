import { NextResponse } from 'next/server'
import { GoogleGenerativeAI} from '@google/generative-ai';


export async function POST(req) {

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: `You are a flashcard creator, you take in text and create
                        multiple flashcards from it. Make sure to create exactly
                        10 flashcards. Both front and back should be one sentence long.
                        The front should be a question, the back should be the answer.

                        Follow these guidelines:
                        1. Create clear and concise questions for the front of the
                        flashcard.
                        2. Provide accurate and informative answers for the back
                        of the flashcard.
                        3. Ensure that each flashcard focuses on a single concept
                        or piece of information.
                        4. Use simple language to make the flashcards accessible to
                        a wide range of learners.
                        5. Include a variety of question types, such as definitions,
                        examples, comparisons, and applications.
                        6. Avoid overly complex or ambigious phrasing in both questions
                        and answers.
                        7. When appropriate, use mnemonics or memory aids to help
                        reinforce the information.
                        8. Tailor the difficulty level of the flashcards to the user's
                        specified preferences.
                        9. If given a body of text, extract the most important and
                        relevant information for the flashcards.
                        10. Aim to create a balanced set of flashcards that covers
                        the topic comprehensively.

                        Remember, the goal is to facilitate effective learning and
                        retention of information through these flashcards.
                        {
                          "flashcards":[
                            {
                              "front": "Front of the card",
                              "back": "Back of the card"
                            }
                          ]
                        }.`
   });

  try {
    /* 'data' is the basically the messages array from the page.js
     * file. This array contains the entire chat history:
     * it contains objects, and each object has a role and content
     * property. The role is either 'user' or 'assistant', and the
     * content is the text that the user or the assistant has typed.
     */
    const data = await req.json();

    /* Take prompt from System Instructions: */
    const prompt = `${model.systemInstruction}\n\n ${data.content}`;

    /* Get the model's response: */
    const result = await model.generateContent(prompt);
    /* Raw response oject from the AI model: */
    const response = result.response;
    /* Raw text content from the response object: */
    const text = response.text();


    /******* CLEAN UP TEXT: *******/
    let cleanedText = text.trim();
    if (cleanedText.startsWith('```json')) {
      /* Remove the first 7 chars in the string: */
      cleanedText = cleanedText.substring(7);
    }
    if (cleanedText.endsWith('```')) {
      /* Remove the last 3 chars in the string: */
      cleanedText = cleanedText.substring(0, cleanedText.length - 3);
    }
    /* Remove whitespace from cleaned text: */
    cleanedText = cleanedText.trim();
    /******* END CLEAN UP TEXT: *******/




    /* Parse the cleaned text into a JSON object */
    const jsonResponse = JSON.parse(cleanedText);

    /* Return the flashcards - as a JSON response */
    return NextResponse.json(jsonResponse);

  } catch (error) {
    console.error("Error in API Call:", error.message);
    console.error("Full Error Details:", error);
    return NextResponse.json({ error: "Error generating response" }, { status: 500 });
  }
}