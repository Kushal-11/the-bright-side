import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Brain, Heart, Lightbulb, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { analyzeJournalWithAI } from "@/lib/together-ai";

interface AIReflectionProps {
  journalContent: string;
  journalTitle: string;
}

interface ReflectionResponse {
  positiveInsights: string[];
  reflectionQuestions: string[];
  encouragement: string;
  growthAreas: string[];
}

export function AIReflection({ journalContent, journalTitle }: AIReflectionProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reflection, setReflection] = useState<ReflectionResponse | null>(null);
  const { toast } = useToast();

  const analyzeJournal = async () => {
    if (!journalContent.trim()) {
      toast({
        title: "No Content",
        description: "Please write some content in your journal before requesting AI reflection.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const analyzedReflection = await analyzeJournalWithAI(journalTitle, journalContent);
      setReflection(analyzedReflection);
      
      toast({
        title: "Reflection Complete",
        description: "Your AI companion has analyzed your journal entry with care."
      });
      
    } catch (error) {
      console.error('AI Analysis Error:', error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Unable to analyze your journal. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };


  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-serif font-semibold text-journal-title flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Reflection
        </h3>
        <Button
          onClick={analyzeJournal}
          disabled={isAnalyzing}
          className="bg-gradient-accent text-primary-foreground hover:opacity-90"
          size="sm"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Brain className="h-4 w-4 mr-2" />
              Get AI Reflection
            </>
          )}
        </Button>
      </div>

      {reflection && (
        <div className="space-y-4">
          {/* Encouragement */}
          <Card className="bg-gradient-warm border-border shadow-soft">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <Heart className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-journal-title mb-2">Personal Message</h4>
                  <p className="text-journal-text leading-relaxed">{reflection.encouragement}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Positive Insights */}
          <Card className="bg-journal-content border-border shadow-soft">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-medium text-journal-title mb-3">Positive Insights</h4>
                  <ul className="space-y-2">
                    {reflection.positiveInsights.map((insight, index) => (
                      <li key={index} className="text-journal-text leading-relaxed flex items-start gap-2">
                        <span className="text-primary mt-1 flex-shrink-0">•</span>
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reflection Questions */}
          <Card className="bg-journal-content border-border shadow-soft">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <Brain className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-medium text-journal-title mb-3">Questions for Reflection</h4>
                  <ul className="space-y-2">
                    {reflection.reflectionQuestions.map((question, index) => (
                      <li key={index} className="text-journal-text leading-relaxed flex items-start gap-2">
                        <span className="text-primary mt-1 flex-shrink-0">?</span>
                        {question}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Growth Areas */}
          <Card className="bg-journal-content border-border shadow-soft">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-medium text-journal-title mb-3">Growth Opportunities</h4>
                  <ul className="space-y-2">
                    {reflection.growthAreas.map((area, index) => (
                      <li key={index} className="text-journal-text leading-relaxed flex items-start gap-2">
                        <span className="text-primary mt-1 flex-shrink-0">→</span>
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}