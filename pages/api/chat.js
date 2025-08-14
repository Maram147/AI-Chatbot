export default async function handler(req, res) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: req.body.inputs }
                ],
                max_tokens: 200,
            }),
        });

        const data = await response.json();

        if (data.error) {
            return res.status(400).json({ error: data.error.message });
        }

        const aiResponse = data.choices[0].message.content;
        res.status(200).json({ text: aiResponse });
    } catch (error) {
        console.error('OpenAI API Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
