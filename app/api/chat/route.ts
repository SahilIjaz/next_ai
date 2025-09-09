import OpenAI from "openai";

const openAi = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

export async function POST(requuest) {
  try {
    const { message } = await requuest.json();

    const response = await openAi.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [{ role: "user", content: message }],
    });

    return Response.json({
      message: response.choices[0].message.content,
    });
  } catch (error) {
    return Response.json(
      {
        message: "failed to fetch response from openai",
        error: true,
      },
      { status: 4000 }
    );
  }
}
