"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, MoreVertical, Pencil, Trash2, Video, ChevronLeft, ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { VideoStatus, DateRange } from "@/app/dashboard/projects/page";
import { useState } from "react";

interface Video {
  id: number;
  title: string;
  status: "completed" | "processing" | "failed";
  created: string;
  duration: string;
}

// Generate 30 demo reels with max 60 seconds duration
const videos: Video[] = Array.from({ length: 30 }, (_, i) => {
  const statuses: ("completed" | "processing" | "failed")[] = ["completed", "processing", "failed"];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const randomSeconds = Math.floor(Math.random() * 60) + 1;
  
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return {
    id: i + 1,
    title: `Video Reel ${i + 1} - ${["Lifestyle", "Gaming", "Tutorial", "Review", "Vlog"][Math.floor(Math.random() * 5)]}`,
    status: randomStatus,
    created: formattedDate,
    duration: `0:${randomSeconds.toString().padStart(2, '0')}`,
  };
});

interface VideoHistoryTableProps {
  status: VideoStatus;
  dateRange: DateRange;
  search: string;
}

export function VideoHistoryTable({ status, dateRange, search }: VideoHistoryTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const itemsPerPage = 10;

  const handleDelete = (video: Video) => {
    setSelectedVideo(video);
    setDeleteDialogOpen(true);
  };

  const onDeleteConfirm = () => {
    // Handle delete logic here
    console.log('Deleting video:', selectedVideo?.title);
    setDeleteDialogOpen(false);
    setSelectedVideo(null);
  };

  const filteredVideos = videos.filter((video) => {
    if (status !== "all" && video.status !== status) return false;
    if (search && !video.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVideos = filteredVideos.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-700 hover:bg-green-50/80";
      case "processing":
        return "bg-yellow-50 text-yellow-700 hover:bg-yellow-50/80";
      case "failed":
        return "bg-red-50 text-red-700 hover:bg-red-50/80";
      default:
        return "";
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Projects</TableHead>
              <TableHead className="hidden sm:table-cell">Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Created Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedVideos.map((video) => (
              <TableRow key={video.id} className="group hover:bg-[#f7f7f7]">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                      <Video className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{video.title}</span>
                      <span className="text-xs text-muted-foreground sm:hidden">
                        {video.duration} • {video.created}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{video.duration}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`capitalize text-xs ${getStatusColor(video.status)}`}
                  >
                    {video.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{video.created}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={video.status !== "completed"}
                      className="hidden sm:inline-flex"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="sm:hidden">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDelete(video)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredVideos.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center">
                  <div className="text-muted-foreground">
                    No projects found matching your criteria
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {filteredVideos.length > 0 && (
        <div className="flex items-center justify-between px-2 py-4 border-t">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredVideos.length)} of{" "}
            {filteredVideos.length} results
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this video?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{selectedVideo?.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={onDeleteConfirm}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}