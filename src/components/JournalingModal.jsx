import React, { useState, useEffect } from 'react';
import { X, Sparkles, RefreshCw, Save } from 'lucide-react';
import { getDailyCheckIn, generatePrompt, improveText } from '../utils/api';

const JournalingModal = ({ isOpen, onClose, mode = 'checkin' }) => {
  const [prompt, setPrompt] = useState('');
  const [entry, setEntry] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mood, setMood] = useState('neutral');

  useEffect(() => {
    if (isOpen && mode === 'checkin') {
      loadCheckInPrompt();
    } else if (isOpen && mode === 'prompt') {
      loadGeneralPrompt();
    }
  }, [isOpen, mode]);

  const loadCheckInPrompt = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getDailyCheckIn(mood);
      setPrompt(response.prompt);
    } catch (err) {
      setError('Failed to load check-in prompt. Make sure the backend is running.');
      setPrompt('How are you feeling today? Take a moment to reflect on your emotions and thoughts.');
    } finally {
      setLoading(false);
    }
  };

  const loadGeneralPrompt = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await generatePrompt('general reflection', '');
      setPrompt(response.prompt);
    } catch (err) {
      setError('Failed to load prompt. Make sure the backend is running.');
      setPrompt('What thoughts are on your mind today? Write freely about anything that comes to you.');
    } finally {
      setLoading(false);
    }
  };

  const handleImproveText = async () => {
    if (!entry.trim()) return;
    
    setLoading(true);
    try {
      const response = await improveText(entry, 'improve clarity and flow');
      setEntry(response.improved);
    } catch (err) {
      setError('Failed to improve text. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    // For now, just close the modal
    // In a real app, you'd save to a database
    console.log('Saving entry:', entry);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] glass-enhanced rounded-3xl overflow-hidden animate-fadeInUp">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/20">
          <h2 className="text-2xl font-bold text-foreground">
            {mode === 'checkin' ? 'Daily Check-in' : 'Free Writing'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-glass-bg rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Mood Selector for Check-in */}
          {mode === 'checkin' && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">How are you feeling?</label>
              <div className="flex gap-2 flex-wrap">
                {['happy', 'neutral', 'sad', 'anxious', 'excited', 'tired'].map((moodOption) => (
                  <button
                    key={moodOption}
                    onClick={() => setMood(moodOption)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      mood === moodOption 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-glass-bg text-foreground hover:bg-glass-border'
                    }`}
                  >
                    {moodOption}
                  </button>
                ))}
              </div>
              <button
                onClick={loadCheckInPrompt}
                disabled={loading}
                className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Update prompt for mood
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Prompt */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <label className="text-sm font-medium text-foreground">Today's Prompt</label>
              <button
                onClick={mode === 'checkin' ? loadCheckInPrompt : loadGeneralPrompt}
                disabled={loading}
                className="text-xs text-primary hover:text-primary/80 flex items-center gap-1"
              >
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                New
              </button>
            </div>
            <div className="p-4 bg-glass-bg rounded-lg text-foreground/80 italic">
              {loading ? 'Loading prompt...' : prompt}
            </div>
          </div>

          {/* Text Area */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Your thoughts</label>
            <textarea
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              placeholder="Start writing..."
              className="w-full h-64 p-4 bg-glass-bg border border-glass-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder-foreground/50"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border/20">
          <button
            onClick={handleImproveText}
            disabled={loading || !entry.trim()}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-glass-bg hover:bg-glass-border rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-4 h-4" />
            Improve Text
          </button>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm bg-glass-bg hover:bg-glass-border rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground hover:opacity-90 rounded-lg transition-opacity"
            >
              <Save className="w-4 h-4" />
              Save Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalingModal;