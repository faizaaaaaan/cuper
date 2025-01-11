"use client";

import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { BulkSettings as BulkSettingsType } from "@/app/dashboard/bulk/page";
import { Wand2 } from "lucide-react";

interface BulkSettingsProps {
  settings: BulkSettingsType;
  onChange: (settings: BulkSettingsType) => void;
}

export function BulkSettings({ settings, onChange }: BulkSettingsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm">
        <Wand2 className="h-4 w-4" />
        <span className="font-medium">Batch Settings</span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="apply-all" className="text-sm">Apply to all videos</Label>
          <Switch
            id="apply-all"
            checked={settings.applyToAll}
            onCheckedChange={(checked) =>
              onChange({ ...settings, applyToAll: checked })
            }
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm">Voice</Label>
          <Select
            value={settings.voice}
            onValueChange={(value) => onChange({ ...settings, voice: value })}
            disabled={!settings.applyToAll}
          >
            <SelectTrigger className="bg-[#f7f7f7] border-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male_us">Male (US)</SelectItem>
              <SelectItem value="female_us">Female (US)</SelectItem>
              <SelectItem value="male_uk">Male (UK)</SelectItem>
              <SelectItem value="female_uk">Female (UK)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm">Subtitle Position</Label>
          <Select
            value={settings.subtitlePosition}
            onValueChange={(value: "top" | "middle" | "bottom") =>
              onChange({ ...settings, subtitlePosition: value })
            }
            disabled={!settings.applyToAll}
          >
            <SelectTrigger className="bg-[#f7f7f7] border-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="top">Top</SelectItem>
              <SelectItem value="middle">Middle</SelectItem>
              <SelectItem value="bottom">Bottom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm">Font</Label>
          <Select
            value={settings.font}
            onValueChange={(value) => onChange({ ...settings, font: value })}
            disabled={!settings.applyToAll}
          >
            <SelectTrigger className="bg-[#f7f7f7] border-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inter">Inter</SelectItem>
              <SelectItem value="roboto">Roboto</SelectItem>
              <SelectItem value="montserrat">Montserrat</SelectItem>
              <SelectItem value="opensans">Open Sans</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}