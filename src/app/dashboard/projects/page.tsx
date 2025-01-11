"use client";

import { Button } from "@/components/ui/button";
import { VideoHistoryTable } from "@/components/video-history-table";
import { VideoHistoryFilters } from "@/components/video-history-filters";
import Link from "next/link";
import { Plus, Coins } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export type VideoStatus = "all" | "completed" | "processing" | "failed";
export type DateRange = "all" | "today" | "week" | "month";

const PageHeader = () => (
  <div className="flex justify-between items-center mb-8">
    <div>
      <h2 className="text-2xl font-semibold mb-1">Projects</h2>
      <p className="text-muted-foreground">
        Track and manage your generated videos
      </p>
    </div>
    <div className="flex items-center gap-4">
      <Link 
        href="/dashboard/pricing" 
        className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-gray-50 transition-colors"
      >
        <Coins className="h-4 w-4 text-yellow-500" />
        <span className="font-medium">65 Credits</span>
      </Link>
      <Link href="/dashboard">
        <Button 
          className="gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="h-4 w-4" />
          Create New
        </Button>
      </Link>
    </div>
  </div>
);

export default function HistoryPage() {
  const [status, setStatus] = useState<VideoStatus>("all");
  const [dateRange, setDateRange] = useState<DateRange>("all");
  const [search, setSearch] = useState("");

  return (
    <div className="flex-1 p-8 pt-6">
      <div className="max-w-[1200px] mx-auto">
        <PageHeader />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-xl border"
        >
          <div className="p-6">
            <VideoHistoryFilters
              status={status}
              dateRange={dateRange}
              search={search}
              onStatusChange={setStatus}
              onDateRangeChange={setDateRange}
              onSearchChange={setSearch}
            />

            <div className="mt-6">
              <VideoHistoryTable
                status={status}
                dateRange={dateRange}
                search={search}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}