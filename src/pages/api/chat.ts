import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateSystemPrompt } from '@/lib/chatbot-context';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { messages } = req.body;

        // Validate request
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({ error: 'Messages array is required' });
        }

        // Check API key
        if (!process.env.GEMINI_API_KEY) {
            console.error('GEMINI_API_KEY is not configured');
            return res.status(500).json({
                error: 'Chatbot configuration error. Please contact the site owner.'
            });
        }

        // Get the model - using Gemini 2.5 Flash Lite for optimal performance
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash-lite',
            systemInstruction: generateSystemPrompt()
        });

        // Build conversation history for Gemini
        // Gemini requires first message to be from user, so filter out initial assistant messages
        const allMessages = messages.slice(0, -1);

        // Find index of first user message
        const firstUserIndex = allMessages.findIndex((msg: any) => msg.role === 'user');

        // Only include messages from first user message onwards
        const history = firstUserIndex >= 0
            ? allMessages.slice(firstUserIndex).map((msg: any) => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }]
            }))
            : [];

        const lastMessage = messages[messages.length - 1];

        // Start chat with history
        const chat = model.startChat({
            history,
            generationConfig: {
                temperature: 0.7,
                topP: 0.95,
                topK: 40,
                maxOutputTokens: 1024,
            },
        });

        // Set up streaming response
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache, no-transform');
        res.setHeader('Connection', 'keep-alive');

        const result = await chat.sendMessageStream(lastMessage.content);

        // Stream the response
        for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
                res.write(`data: ${JSON.stringify({ text })}\n\n`);
            }
        }

        // Send completion signal
        res.write(`data: [DONE]\n\n`);
        res.end();

    } catch (error: any) {
        console.error('Chat API error:', error);

        // Handle specific error types
        if (error.message?.includes('API key')) {
            return res.status(500).json({
                error: 'API key error. Please check configuration.'
            });
        }

        if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
            return res.status(429).json({
                error: 'Service is temporarily busy. Please try again in a moment.'
            });
        }

        return res.status(500).json({
            error: 'Failed to process your message. Please try again.'
        });
    }
}
