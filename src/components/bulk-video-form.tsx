"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Plus } from "lucide-react";
import { BulkVideo } from "@/app/dashboard/bulk/page";

const formSchema = z.object({
  topic: z.string().min(2, {
    message: "Topic must be at least 2 characters.",
  }),
  description: z.string().max(500, {
    message: "Description must be less than 500 characters.",
  }),
  style: z.string().min(2, {
    message: "Style must be at least 2 characters.",
  }),
  duration: z.number().min(30).max(60),
});

interface BulkVideoFormProps {
  onAdd: (video: BulkVideo) => void;
  disabled?: boolean;
}

export function BulkVideoForm({ onAdd, disabled }: BulkVideoFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      description: "",
      style: "cinematic",
      duration: 60,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAdd({
      id: Math.random().toString(36).substr(2, 9),
      ...values,
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video Topic</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter video topic"
                  className="bg-[#f7f7f7] border-0"
                  disabled={disabled}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter a detailed description of your video content"
                  className="min-h-[100px] bg-[#f7f7f7] border-0"
                  disabled={disabled}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide more context about your video content
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video Style</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled}>
                <FormControl>
                  <SelectTrigger className="bg-[#f7f7f7] border-0">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="cinematic">Cinematic</SelectItem>
                  <SelectItem value="vlog">Vlog Style</SelectItem>
                  <SelectItem value="tutorial">Tutorial</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="documentary">Documentary</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration (seconds)</FormLabel>
              <FormControl>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Length</span>
                    <span className="font-medium">{field.value}s</span>
                  </div>
                  <Slider
                    value={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                    min={30}
                    max={60}
                    step={1}
                    disabled={disabled}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>30s</span>
                    <span>60s</span>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full bg-black hover:bg-black/90"
          disabled={disabled}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Video
        </Button>

        {disabled && (
          <p className="text-sm text-muted-foreground text-center">
            Maximum limit of 10 videos reached
          </p>
        )}
      </form>
    </Form>
  );
}