from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from openai import OpenAI
import logging

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configure CORS
CORS(app, origins=[os.getenv('FRONTEND_URL', 'http://localhost:3000')])

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize OpenAI client for Together AI
client = OpenAI(
    api_key=os.getenv('OPENAI_API_KEY'),
    base_url=os.getenv('OPENAI_API_BASE', 'https://api.together.xyz/v1')
)

# Health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "The Bright Side API is running"})

# Daily check-in endpoint
@app.route('/api/ai/check-in', methods=['POST'])
def check_in():
    try:
        data = request.get_json()
        mood = data.get('mood', 'neutral')
        
        # Create a personalized check-in prompt based on mood
        system_prompt = """You are a gentle, empathetic AI journaling assistant for "The Bright Side" app. 
        Your role is to provide warm, supportive daily check-in prompts that help users reflect on their day.
        Keep responses concise (2-3 sentences max), encouraging, and focused on mindful reflection."""
        
        user_prompt = f"Generate a daily check-in prompt for someone feeling {mood}. Make it warm and encouraging."
        
        response = client.chat.completions.create(
            model="meta-llama/Llama-2-7b-chat-hf",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            max_tokens=150,
            temperature=0.7
        )
        
        prompt = response.choices[0].message.content.strip()
        
        return jsonify({
            "success": True,
            "prompt": prompt,
            "mood": mood
        })
        
    except Exception as e:
        logger.error(f"Error in check-in endpoint: {str(e)}")
        return jsonify({
            "success": False,
            "error": "Failed to generate check-in prompt"
        }), 500

# Context-aware prompting endpoint
@app.route('/api/ai/prompt', methods=['POST'])
def generate_prompt():
    try:
        data = request.get_json()
        context = data.get('context', '')
        topic = data.get('topic', 'general reflection')
        
        system_prompt = """You are a thoughtful AI journaling assistant. Generate creative, 
        introspective prompts that help users explore their thoughts and feelings deeply. 
        Keep prompts open-ended and thought-provoking."""
        
        user_prompt = f"Create a journaling prompt about {topic}. Context: {context}"
        
        response = client.chat.completions.create(
            model="meta-llama/Llama-2-7b-chat-hf",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            max_tokens=100,
            temperature=0.8
        )
        
        prompt = response.choices[0].message.content.strip()
        
        return jsonify({
            "success": True,
            "prompt": prompt,
            "topic": topic
        })
        
    except Exception as e:
        logger.error(f"Error in prompt endpoint: {str(e)}")
        return jsonify({
            "success": False,
            "error": "Failed to generate prompt"
        }), 500

# Text improvement endpoint
@app.route('/api/ai/rewrite', methods=['POST'])
def rewrite_text():
    try:
        data = request.get_json()
        text = data.get('text', '')
        style = data.get('style', 'improve clarity')
        
        if not text:
            return jsonify({
                "success": False,
                "error": "No text provided"
            }), 400
        
        system_prompt = """You are a helpful writing assistant. Improve the given text while 
        maintaining the author's voice and emotional authenticity. Focus on clarity, flow, and expression."""
        
        user_prompt = f"Please {style} for this journal entry: {text}"
        
        response = client.chat.completions.create(
            model="meta-llama/Llama-2-7b-chat-hf",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            max_tokens=300,
            temperature=0.5
        )
        
        improved_text = response.choices[0].message.content.strip()
        
        return jsonify({
            "success": True,
            "original": text,
            "improved": improved_text,
            "style": style
        })
        
    except Exception as e:
        logger.error(f"Error in rewrite endpoint: {str(e)}")
        return jsonify({
            "success": False,
            "error": "Failed to improve text"
        }), 500

# Summarization endpoint
@app.route('/api/ai/summarize', methods=['POST'])
def summarize_text():
    try:
        data = request.get_json()
        text = data.get('text', '')
        
        if not text:
            return jsonify({
                "success": False,
                "error": "No text provided"
            }), 400
        
        system_prompt = """You are a thoughtful summarization assistant. Create concise, 
        meaningful summaries that capture the emotional essence and key insights from journal entries."""
        
        user_prompt = f"Summarize this journal entry, focusing on key themes and emotions: {text}"
        
        response = client.chat.completions.create(
            model="meta-llama/Llama-2-7b-chat-hf",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            max_tokens=150,
            temperature=0.6
        )
        
        summary = response.choices[0].message.content.strip()
        
        return jsonify({
            "success": True,
            "original_length": len(text),
            "summary": summary,
            "summary_length": len(summary)
        })
        
    except Exception as e:
        logger.error(f"Error in summarize endpoint: {str(e)}")
        return jsonify({
            "success": False,
            "error": "Failed to summarize text"
        }), 500

# Quick reflection nudge endpoint
@app.route('/api/ai/nudge', methods=['POST'])
def reflection_nudge():
    try:
        data = request.get_json()
        time_of_day = data.get('time_of_day', 'any')
        
        system_prompt = """You are a gentle mindfulness coach. Provide brief, encouraging 
        nudges that inspire quick moments of reflection throughout the day."""
        
        user_prompt = f"Create a brief reflection nudge for {time_of_day}. Keep it under 20 words."
        
        response = client.chat.completions.create(
            model="meta-llama/Llama-2-7b-chat-hf",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            max_tokens=50,
            temperature=0.9
        )
        
        nudge = response.choices[0].message.content.strip()
        
        return jsonify({
            "success": True,
            "nudge": nudge,
            "time_of_day": time_of_day
        })
        
    except Exception as e:
        logger.error(f"Error in nudge endpoint: {str(e)}")
        return jsonify({
            "success": False,
            "error": "Failed to generate reflection nudge"
        }), 500

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "success": False,
        "error": "Endpoint not found"
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        "success": False,
        "error": "Internal server error"
    }), 500

if __name__ == '__main__':
    # Check if API key is configured
    if not os.getenv('OPENAI_API_KEY'):
        logger.warning("Warning: OPENAI_API_KEY not found in environment variables")
        print("\n🔑 Please add your Together AI API key to backend/.env file")
        print("Replace 'your_together_ai_api_key_here' with your actual API key\n")
    
    # Run the Flask app
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=os.getenv('FLASK_DEBUG', 'True').lower() == 'true'
    )