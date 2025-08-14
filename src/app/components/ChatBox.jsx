import React, { useState } from 'react';
import axios from 'axios';
import ResponseMessage from './ResponseMessage';
import PromptMessage from './PromptMessage';
import { useEffect, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
const ChatBox = () => {
    const [response, setResponse] = useState([]);
const [init, setInit] = useState(false);
    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const API_TOKEN = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    const handleFetchAIResponse = async (prompt) => {
        try {
            setResponse((prev) => [...prev, { type: 'prompt', text: prompt }]);
            const { data } = await axios.post(
                `${API_URL}?key=${API_TOKEN}`,
                {
                    contents: [
                        {
                            parts: [{ text: prompt }]
                        }
                    ]
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
            setResponse((prev) => [...prev, { type: 'response', text: aiText }]);

        } catch (error) {
            console.error("AI API Error:", error.response?.data || error.message);
            setResponse((prev) => [...prev, { type: 'response', text: 'Error fetching response.' }]);
        }
    };


    return (
        <div className='chatbox blur-bg large-shadow bg-[#000518] bg-opacity-70 w-[90vw] md:w-[70vw] lg:w-[40vw] pb-6 h-[85vh]'>
            {/* Header */}
            <div className='h-[13%] pl-3 border-b border-[#ffffff1a] flex items-center gap-x-4'>
                <img className='rounded-full w-12 h-12' src="../favicon.ico" alt="" />
                <div>
                    <h1 className='text-white text-lg font-semibold'>AI Chat Bot</h1>
                    <p className='text-sm text-gray-400'>Ask me anything!</p>
                </div>
            </div>

            {/* Messages */}
            <div className='h-[77%] overflow-y-auto px-4 py-2'>
                <div className='flex flex-col py-5 overflow-y-auto h-full custom-scrollbar'>
                    {response.length > 0 ? (
                        response.map((item, index) => (
                            item.type === 'prompt' ? (
                                <div key={index} className='self-end flex flex-col gap-2'>
                                    <PromptMessage message={item.text} />
                                </div>
                            ) : (
                                <div key={index} className='self-start flex flex-col gap-2'>
                                    <ResponseMessage message={item.text} />
                                </div>
                            )
                        ))
                    ) : (
                        <div className='p-19 gap-4 flex flex-col items-center justify-center h-full'>
                            <p className='text-2xl font-bold'>Welcome to the AI Chat Bot</p>
                            <p className='text-gray-50'>Ask me anything!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Input */}
            <div className='h-[10%] px-5'>
                <input
                    onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim() !== '') {
                            handleFetchAIResponse(e.target.value);
                            e.target.value = ''; 
                        }
                    }}
                    type="text"
                    className='h-full rounded-full border-gray-700 border bg-transparent px-5 w-full outline-none text-white'
                    placeholder='Type your question...'
                />
            </div>
        </div>
    );
};

export default ChatBox;
