"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Wand2 } from "lucide-react";

interface ScriptEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (script: string) => void;
}

export function ScriptEditorModal({
  isOpen,
  onClose,
  onConfirm,
}: ScriptEditorModalProps) {
  // For now, we'll use a dummy script
  const [script, setScript] = useState(
    `Here's a script for your video about "5 Morning Habits for Success":

1. Start with a Strong Introduction
"Want to transform your mornings and set yourself up for success? In this video, we'll explore 5 powerful morning habits that successful people swear by."

2. First Habit: Early Rising
"The first habit is waking up early. Studies show that 90% of executives wake up before 6am, giving them a quiet, distraction-free start to their day."

3. Second Habit: Hydration
"Next up is hydrating properly. Drinking water first thing in the morning kickstarts your metabolism and helps your brain function at its best."

4. Third Habit: Movement
"The third habit is morning exercise. Even just 10 minutes of movement can boost your energy levels and improve your focus for the entire day."

5. Fourth Habit: Mindfulness
"Practice mindfulness or meditation. Taking just 5 minutes to center yourself can reduce stress and increase productivity."

6. Fifth Habit: Planning
"Finally, plan your day. Taking time to review your goals and schedule helps you stay focused and productive."

7. Closing
"Implement these 5 habits gradually, and watch as they transform your mornings and set you up for daily success. Don't forget to like and subscribe for more tips!"
`
  );

  const handleConfirm = () => {
    onConfirm(script);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Video Script</DialogTitle>
          <DialogDescription>
            Review and edit the generated script for your video
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>Generated script based on your inputs</span>
          </div>

          <Textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            className="min-h-[400px] font-mono text-sm bg-[#f7f7f7] border-0"
          />

          <div className="bg-[#f7f7f7] p-3 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <Wand2 className="h-4 w-4" />
              <span className="font-medium">Pro tip:</span>
              <span className="text-muted-foreground">
                Edit the script to match your style and tone. Add or remove sections as needed.
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="bg-black hover:bg-black/90">
            Continue to Video Generation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}