"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Pencil, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import { BulkVideo } from "@/app/dashboard/bulk/page";

interface BulkVideoPreviewProps {
  videos: BulkVideo[];
  onRemove: (id: string) => void;
  onUpdate: (id: string, updates: Partial<BulkVideo>) => void;
  maxVideos: number;
}

export function BulkVideoPreview({ videos, onRemove, onUpdate, maxVideos }: BulkVideoPreviewProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<BulkVideo>>({});

  const handleEdit = (video: BulkVideo) => {
    setEditingId(video.id);
    setEditForm(video);
  };

  const handleSave = () => {
    if (editingId && editForm) {
      onUpdate(editingId, editForm);
      setEditingId(null);
      setEditForm({});
    }
  };

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No videos added yet. Add a video using the form or import from CSV.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1 mr-4">
          <Progress value={(videos.length / maxVideos) * 100} className="h-2" />
        </div>
        <div className="text-sm text-muted-foreground whitespace-nowrap">
          {videos.length} of {maxVideos} videos
        </div>
      </div>

      {videos.map((video) => (
        <div
          key={video.id}
          className="flex items-start gap-4 p-4 rounded-lg bg-[#f7f7f7]"
        >
          <div className="flex-1 space-y-4">
            {editingId === video.id ? (
              <>
                <Input
                  value={editForm.topic}
                  onChange={(e) => setEditForm({ ...editForm, topic: e.target.value })}
                  className="bg-white border-0"
                  placeholder="Video topic"
                />
                <Textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="bg-white border-0"
                  placeholder="Video description"
                />
                <div className="flex gap-4">
                  <Select
                    value={editForm.style}
                    onValueChange={(value) => setEditForm({ ...editForm, style: value })}
                  >
                    <SelectTrigger className="bg-white border-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cinematic">Cinematic</SelectItem>
                      <SelectItem value="vlog">Vlog Style</SelectItem>
                      <SelectItem value="tutorial">Tutorial</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="documentary">Documentary</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    value={editForm.duration}
                    onChange={(e) => setEditForm({ ...editForm, duration: parseInt(e.target.value) })}
                    min={30}
                    max={60}
                    className="bg-white border-0 w-24"
                  />
                </div>
              </>
            ) : (
              <>
                <h3 className="font-medium">{video.topic}</h3>
                <p className="text-sm text-muted-foreground">{video.description}</p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span className="capitalize">{video.style}</span>
                  <span>{video.duration}s</span>
                </div>
              </>
            )}
          </div>
          <div className="flex gap-2">
            {editingId === video.id ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setEditingId(null);
                    setEditForm({});
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSave}
                >
                  <Save className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(video)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemove(video.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}