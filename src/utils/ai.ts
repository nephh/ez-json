import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const { API_KEY } = process.env;
// Access your API key as an environment variable (see "Set up your API key" above)
if (!API_KEY) {
  throw new Error("API_KEY is missing in the environment variables");
}
const genAI = new GoogleGenerativeAI(API_KEY);
// For text-only input, use the gemini-pro model
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export default async function generateValue(key: string) {
  // const prompt = `Generate a word or phrase that will be used as a value in a JSON object with the key:
  // ${userWord}. If the key resembles something like an article content, a user bio, or something that would constitute a longer paragraph, you can generate a longer text.
  // Please ensure that the generated word or phrase is unique enough to avoid repetition. Make sure the word or phrase is plain text without any quotes. Characters like emojis, punctuation, numbers, and special characters are allowed.
  // Do NOT generate any sensitive or real-world data such as addresses, names, or passwords to avoid any safety errors.
  // This word should not resemble any real or sensitive data. The generated data should be completely made up and safe to use.`;

  const prompt = `Generate a unique, fictional value for a JSON object key named "${key}". The value should be appropriate for a wide range of potential keys and could be a single word, a phrase, or a longer paragraph of text, depending on the context suggested by the key. 
  Most values will be short, but some may be longer if the key suggests a longer form of content (such as a user bio or article content.) Make sure it is NEVER a list of items or an array. It should only be one value.
  Please ensure the generated value is unique and varied enough to avoid repetition. It should be plain text without any enclosing quotes. Emojis, punctuation, numbers, and special characters are allowed if they make sense in the context. 
  Do NOT generate any sensitive or real-world data such as addresses, names, or passwords. The generated value should not resemble any real or sensitive data. It should be completely made up, safe to use, and suitable for a mock JSON object.`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  return text;
}
