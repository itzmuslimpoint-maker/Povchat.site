require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// API Keys from .env file (SECURE ✅)
const DEEPSEEK_KEY = process.env.DEEPSEEK_KEY;
const GROK_KEY = process.env.GROK_KEY;

// Check if keys exist
if (!DEEPSEEK_KEY || !GROK_KEY) {
    console.error('❌ ERROR: API keys not found in .env file!');
    console.error('Please create .env file with DEEPSEEK_KEY and GROK_KEY');
    process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ============================================
// DEEPSEEK API ENDPOINT
// ============================================
app.post('/api/deepseek', async (req, res) => {
    try {
        const { systemPrompt, history, userMessage } = req.body;
        
        const messages = [
            { role: 'system', content: systemPrompt },
            ...history,
            { role: 'user', content: userMessage }
        ];

        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_KEY}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                max_tokens: 200,
                temperature: 0.88,
                messages: messages
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `DeepSeek API error (${response.status})`);
        }

        const data = await response.json();
        const reply = data?.choices?.[0]?.message?.content?.trim();

        if (!reply || reply.length < 3) {
            throw new Error('Empty or too short reply from DeepSeek');
        }

        console.log('✅ DeepSeek replied successfully');
        res.json({ success: true, reply, source: 'deepseek' });
        
    } catch (error) {
        console.error('❌ DeepSeek error:', error.message);
        res.json({ success: false, error: error.message });
    }
});

// ============================================
// GROK API ENDPOINT
// ============================================
app.post('/api/grok', async (req, res) => {
    try {
        const { systemPrompt, history, userMessage } = req.body;
        
        const messages = [
            { role: 'system', content: systemPrompt },
            ...history,
            { role: 'user', content: userMessage }
        ];

        const response = await fetch('https://api.x.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROK_KEY}`
            },
            body: JSON.stringify({
                model: 'grok-beta',
                max_tokens: 200,
                temperature: 1.0,
                messages: messages
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `Grok API error (${response.status})`);
        }

        const data = await response.json();
        const reply = data?.choices?.[0]?.message?.content?.trim();

        if (!reply || reply.length < 3) {
            throw new Error('Empty or too short reply from Grok');
        }

        console.log('✅ Grok replied successfully');
        res.json({ success: true, reply, source: 'grok' });
        
    } catch (error) {
        console.error('❌ Grok error:', error.message);
        res.json({ success: false, error: error.message });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        deepseek: DEEPSEEK_KEY ? 'configured' : 'missing',
        grok: GROK_KEY ? 'configured' : 'missing'
    });
});

// Serve HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log('============================================');
    console.log(`🚀 POVChat Server Running!`);
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`🔑 DeepSeek: ${DEEPSEEK_KEY.substring(0, 8)}...`);
    console.log(`🔑 Grok: ${GROK_KEY.substring(0, 8)}...`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('============================================');
});
