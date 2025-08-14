// API utility functions for The Bright Side backend

const API_BASE_URL = 'http://localhost:5000';

// Generic API request function
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

// Health check
export async function checkHealth() {
  return apiRequest('/health');
}

// Daily check-in
export async function getDailyCheckIn(mood = 'neutral') {
  return apiRequest('/api/ai/check-in', {
    method: 'POST',
    body: JSON.stringify({ mood }),
  });
}

// Generate context-aware prompt
export async function generatePrompt(topic = 'general reflection', context = '') {
  return apiRequest('/api/ai/prompt', {
    method: 'POST',
    body: JSON.stringify({ topic, context }),
  });
}

// Improve text
export async function improveText(text, style = 'improve clarity') {
  return apiRequest('/api/ai/rewrite', {
    method: 'POST',
    body: JSON.stringify({ text, style }),
  });
}

// Summarize text
export async function summarizeText(text) {
  return apiRequest('/api/ai/summarize', {
    method: 'POST',
    body: JSON.stringify({ text }),
  });
}

// Get reflection nudge
export async function getReflectionNudge(timeOfDay = 'any') {
  return apiRequest('/api/ai/nudge', {
    method: 'POST',
    body: JSON.stringify({ time_of_day: timeOfDay }),
  });
}