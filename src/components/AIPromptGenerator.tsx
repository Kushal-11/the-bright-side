import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, RefreshCw, Loader2, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateJournalPrompt } from "@/lib/together-ai";

interface AIPromptGeneratorProps {
  onPromptSelect?: (prompt: string) => void;
}

export function AIPromptGenerator({ onPromptSelect }: AIPromptGeneratorProps) {
  const [prompt, setPrompt] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const generatePrompt = async () => {
    setIsGenerating(true);
    setIsCopied(false);
    
    try {
      const newPrompt = await generateJournalPrompt();
      setPrompt(newPrompt);
      
      toast({
        title: "Prompt Generated",
        description: "Here's a new writing prompt to inspire your reflection."
      });
      
    } catch (error) {
      console.error('Failed to generate prompt:', error);
      toast({
        title: "Generation Failed",
        description: "Unable to generate a prompt. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyPrompt = async () => {
    if (!prompt) return;
    
    try {
      await navigator.clipboard.writeText(prompt);
      setIsCopied(true);
      toast({
        title: "Copied",
        description: "Prompt copied to clipboard."
      });
      
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy prompt to clipboard.",
        variant: "destructive"
      });
    }
  };

  const usePrompt = () => {
    if (prompt && onPromptSelect) {
      onPromptSelect(prompt);
      toast({
        title: "Prompt Added",
        description: "The prompt has been added to your journal entry."
      });
    }
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800 shadow-md">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-serif font-semibold text-journal-title flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              Writing Inspiration
            </h3>
            <Button
              onClick={generatePrompt}
              disabled={isGenerating}
              size="sm"
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  New Prompt
                </>
              )}
            </Button>
          </div>

          {prompt && (
            <div className="space-y-3">
              <div className="p-4 bg-white/70 dark:bg-gray-800/50 rounded-lg border border-purple-200 dark:border-purple-700">
                <p className="text-journal-text leading-relaxed italic">
                  "{prompt}"
                </p>
              </div>
              
              <div className="flex gap-2">
                {onPromptSelect && (
                  <Button
                    onClick={usePrompt}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Use This Prompt
                  </Button>
                )}
                <Button
                  onClick={copyPrompt}
                  variant="outline"
                  size="sm"
                  className="border-purple-200 hover:bg-purple-50 dark:border-purple-700 dark:hover:bg-purple-950/20"
                >
                  {isCopied ? (
                    <>
                      <Check className="h-4 w-4 mr-2 text-green-600" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {!prompt && (
            <div className="text-center py-4">
              <p className="text-journal-placeholder text-sm">
                Click "New Prompt" to get AI-generated writing inspiration
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}