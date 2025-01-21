import { HfInference } from "@huggingface/inference";

const client = new HfInference(process.env.EXPO_PUBLIC_NLP_API);

export const getSuggestion=async(data)=>{
    const chatCompletion = await client.chatCompletion({
        model: "mistralai/Mistral-7B-Instruct-v0.2",
        messages: [
            {
                role: "user",
                content: `Using the given weather data ${data}, suggest an active sustainable measure for a common man within 20 words`
            }
        ],
        max_tokens: 500
    });
    return chatCompletion.choices[0].message
}