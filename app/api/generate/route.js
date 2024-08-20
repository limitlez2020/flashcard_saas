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
                        You should return in the following JSON format:
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
    /* Response is in JSON format: */
    const response = result.response;
    const text = response.text();

    /* Return the Assistant's response - flashcards - as a JSON response */
    // console.log("Reponse is:  ", text);
    return NextResponse.json(text);

    // const data = await req.json();

    // const model = genAI.getGenerativeModel({
    //   model: "gemini-1.5-flash",
    //   generationConfig: { responseMimeType: "application/json" }
    // }); 

    // const result = await model.generateContent({
    //   contents: [
    //     {
    //       role: "model",
    //       content: [{text: model.systemInstruction}],
    //     },
    //     {
    //       role: "user",
    //       content: [{text: data}],
    //     }
    //   ],
    // });

    // const flashcards = JSON.parse(result.result)
    // return NextResponse.json( flashcards.flashcards );



  } catch (error) {
    console.error("Error in API Call:", error.message);
    console.error("Full Error Details:", error);
    return NextResponse.json({ error: "Error generating response" }, { status: 500 });
  }
}