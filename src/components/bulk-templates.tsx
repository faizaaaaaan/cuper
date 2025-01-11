"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BulkVideo } from "@/app/dashboard/bulk/page";
import { FileText, Plus } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  videos: BulkVideo[];
}

// Example templates
const templates: Template[] = [
  {
    id: "1",
    name: "Product Launch Series",
    description: "5 videos perfect for launching a new product",
    videos: [
      {
        id: "1",
        topic: "Product Teaser",
        style: "cinematic",
        duration: 30,
      },
      {
        id: "2",
        topic: "Feature Showcase",
        style: "tutorial",
        duration: 45,
      },
      {
        id: "3",
        topic: "Customer Testimonials",
        style: "documentary",
        duration: 60,
      },
    ],
  },
  {
    id: "2",
    name: "Educational Series",
    description: "3 videos for educational content",
    videos: [
      {
        id: "4",
        topic: "Introduction to Topic",
        style: "tutorial",
        duration: 45,
      },
      {
        id: "5",
        topic: "Deep Dive",
        style: "tutorial",
        duration: 60,
      },
      {
        id: "6",
        topic: "Practice Examples",
        style: "tutorial",
        duration: 45,
      },
    ],
  },
];

interface BulkTemplatesProps {
  onApply: (template: Template) => void;
}

export function BulkTemplates({ onApply }: BulkTemplatesProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <FileText className="h-4 w-4" />
          <span className="font-medium">Templates</span>
        </div>
        <Button variant="ghost" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>

      <ScrollArea className="h-[200px] pr-4">
        <div className="space-y-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className="p-4 rounded-lg bg-[#f7f7f7] hover:bg-[#f0f0f0] transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium">{template.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {template.description}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onApply(template)}
                >
                  Use Template
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                {template.videos.length} videos
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}