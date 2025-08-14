import React from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import Header from './components/Header';
import ThreeJSHero from './components/ThreeJSHero';
import FeatureCard from './components/FeatureCard';
import TypewriterText from './components/TypewriterText';
import { Brain, Shield, FileText, ArrowRight } from 'lucide-react';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen relative overflow-hidden">
        {/* Three.js Background */}
        <div className="fixed inset-0 z-0">
          <ThreeJSHero />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Header />
          
          {/* Hero Section */}
          <main className="pt-24 pb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                  <em className="text-primary font-light">Journaling</em> to unwind your mind
                </h1>
                
                <p className="text-xl sm:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto">
                  AI-powered, distraction-free space for your thoughts.
                </p>

                <div className="text-lg sm:text-xl text-foreground/70 mb-12 min-h-[2rem]">
                  <TypewriterText 
                    phrases={['reflect on your day', 'plan tomorrow', 'let go of stress']}
                    className="text-primary font-medium"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
                  <button className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
                    Check in
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="btn-secondary text-lg px-8 py-4">
                    Explore a demo
                  </button>
                </div>
              </div>

              {/* Features Section */}
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-12">
                  Your thoughts, beautifully organized
                </h2>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <FeatureCard
                    icon={Brain}
                    title="AI-assisted prompts"
                    description="Get gentle, context-aware prompts that help you explore your thoughts and feelings with empathy and understanding."
                    delay={0}
                  />
                  
                  <FeatureCard
                    icon={Shield}
                    title="Private & secure"
                    description="Your thoughts stay yours. End-to-end encryption ensures your journal entries remain completely private and secure."
                    delay={200}
                  />
                  
                  <FeatureCard
                    icon={FileText}
                    title="Build pages like Notion"
                    description="Create rich, structured journal entries with headings, lists, quotes, and more using our intuitive block-based editor."
                    delay={400}
                  />
                </div>
              </div>

              {/* About Section */}
              <section id="about" className="mt-32 max-w-4xl mx-auto text-center">
                <div className="glass-card p-12 rounded-3xl">
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                    About The Bright Side
                  </h2>
                  <p className="text-lg text-foreground/80 leading-relaxed mb-8">
                    We believe that journaling is one of the most powerful tools for mental wellness and personal growth. 
                    The Bright Side combines the wisdom of traditional journaling with the intelligence of modern AI 
                    to create a space where your thoughts can flow freely and meaningfully.
                  </p>
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    Our mission is to make mindful reflection accessible, enjoyable, and transformative for everyone. 
                    Whether you're processing emotions, setting intentions, or simply capturing life's moments, 
                    we're here to guide you with gentle prompts and a beautiful, distraction-free environment.
                  </p>
                </div>
              </section>

              {/* Help Section */}
              <section id="help" className="mt-20 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                    Getting Started
                  </h2>
                  <p className="text-lg text-foreground/80">
                    Your journey to mindful journaling begins here
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="glass-card p-8 rounded-2xl">
                    <h3 className="text-xl font-semibold text-foreground mb-4">Quick Start Guide</h3>
                    <ul className="space-y-3 text-foreground/80">
                      <li className="flex items-start gap-3">
                        <span className="text-primary font-bold">1.</span>
                        Click "Check in" to begin your first entry
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary font-bold">2.</span>
                        Follow the AI-generated prompts or write freely
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary font-bold">3.</span>
                        Use the block editor to structure your thoughts
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary font-bold">4.</span>
                        Switch themes to match your mood
                      </li>
                    </ul>
                  </div>

                  <div className="glass-card p-8 rounded-2xl">
                    <h3 className="text-xl font-semibold text-foreground mb-4">Tips for Success</h3>
                    <ul className="space-y-3 text-foreground/80">
                      <li className="flex items-start gap-3">
                        <span className="text-accent">•</span>
                        Set aside 5-10 minutes daily for reflection
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent">•</span>
                        Don't worry about perfect writing—authenticity matters
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent">•</span>
                        Use the AI prompts when you're feeling stuck
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent">•</span>
                        Review past entries to track your growth
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* CTA Section */}
              <section className="mt-32 text-center">
                <div className="glass-card p-12 rounded-3xl max-w-2xl mx-auto">
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                    Ready to begin?
                  </h2>
                  <p className="text-lg text-foreground/80 mb-8">
                    Start your mindful journaling journey today. No account required to try.
                  </p>
                  <button className="btn-primary text-lg px-8 py-4 flex items-center gap-2 mx-auto">
                    Try for free
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </section>
            </div>
          </main>

          {/* Footer */}
          <footer className="border-t border-border/20 bg-glass backdrop-blur-md mt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center text-foreground/60">
                <p>&copy; 2025 The Bright Side. Made with ❤️ for mindful reflection.</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
