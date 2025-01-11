"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { VideoStatus, DateRange } from "@/app/dashboard/projects/page";

interface VideoHistoryFiltersProps {
  status: VideoStatus;
  dateRange: DateRange;
  search: string;
  onStatusChange: (value: VideoStatus) => void;
  onDateRangeChange: (value: DateRange) => void;
  onSearchChange: (value: string) => void;
}

export function VideoHistoryFilters({
  status,
  dateRange,
  search,
  onStatusChange,
  onDateRangeChange,
  onSearchChange,
}: VideoHistoryFiltersProps) {
  return (
    <div className="flex gap-4 items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search videos..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-10 rounded-lg border-gray-200 focus:border-gray-300 focus:ring-0 text-sm"
        />
      </div>
      <Select
        value={status}
        onValueChange={(value) => onStatusChange(value as VideoStatus)}
      >
        <SelectTrigger className="w-[130px] h-10 rounded-lg border-gray-200 focus:ring-0 bg-white text-sm font-normal">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent className="rounded-lg border-gray-200">
          <SelectItem value="all" className="text-sm">All Status</SelectItem>
          <SelectItem value="completed" className="text-sm">Completed</SelectItem>
          <SelectItem value="processing" className="text-sm">Processing</SelectItem>
          <SelectItem value="failed" className="text-sm">Failed</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={dateRange}
        onValueChange={(value) => onDateRangeChange(value as DateRange)}
      >
        <SelectTrigger className="w-[130px] h-10 rounded-lg border-gray-200 focus:ring-0 bg-white text-sm font-normal">
          <SelectValue placeholder="All Time" />
        </SelectTrigger>
        <SelectContent className="rounded-lg border-gray-200">
          <SelectItem value="all" className="text-sm">All Time</SelectItem>
          <SelectItem value="today" className="text-sm">Today</SelectItem>
          <SelectItem value="week" className="text-sm">This Week</SelectItem>
          <SelectItem value="month" className="text-sm">This Month</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}