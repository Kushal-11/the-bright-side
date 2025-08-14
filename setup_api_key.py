#!/usr/bin/env python3
"""
Setup script for The Bright Side - adds your Together AI API key to the backend
"""

import os

def setup_api_key():
    print("🔑 The Bright Side API Key Setup")
    print("=" * 40)
    
    # Get the API key from user
    api_key = input("Please enter your Together AI API key: ").strip()
    
    if not api_key:
        print("❌ No API key provided. Exiting.")
        return False
    
    # Path to the .env file
    env_file = os.path.join(os.path.dirname(__file__), 'backend', '.env')
    
    try:
        # Read the current .env file
        with open(env_file, 'r') as f:
            content = f.read()
        
        # Replace the placeholder with the actual API key
        updated_content = content.replace(
            'OPENAI_API_KEY=your_together_ai_api_key_here',
            f'OPENAI_API_KEY={api_key}'
        )
        
        # Write back to the .env file
        with open(env_file, 'w') as f:
            f.write(updated_content)
        
        print("✅ API key successfully added to backend/.env")
        print(f"📁 File location: {env_file}")
        print("\n🚀 You can now run both the frontend and backend:")
        print("   Frontend: npm run dev (already running on http://localhost:3000)")
        print("   Backend:  cd backend && source venv/bin/activate && python src/main.py")
        print("\n💡 The backend is already running on http://localhost:5000")
        return True
        
    except Exception as e:
        print(f"❌ Error updating API key: {e}")
        return False

if __name__ == "__main__":
    setup_api_key()