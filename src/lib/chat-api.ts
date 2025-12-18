export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export async function* streamChatResponse(messages: Message[]): AsyncGenerator<string, void, unknown> {
    const messageHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
    }));

    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: messageHistory }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
    }

    const reader = response.body?.getReader();
    if (!reader) {
        throw new Error('No response stream');
    }

    const decoder = new TextDecoder();

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
            if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') break;

                try {
                    const parsed = JSON.parse(data);
                    if (parsed.text) {
                        yield parsed.text;
                    }
                } catch (e) {
                    console.error('Error parsing stream data:', e);
                }
            }
        }
    }
}
