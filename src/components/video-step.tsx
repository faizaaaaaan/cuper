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
import { ArrowRight, Sparkles } from "lucide-react";
import { Slider } from "@/components/ui/slider";

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

interface VideoStepProps {
  onNext: (data: z.infer<typeof formSchema>) => void;
}

export function VideoStep({ onNext }: VideoStepProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      description: "",
      style: "",
      duration: 60,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onNext(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video Topic</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Enter your video topic"
                      className="pl-4 h-11 bg-[#f7f7f7] border-0"
                      {...field}
                    />
                    <Sparkles className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                  </div>
                </FormControl>
                <FormDescription>
                  Describe what your video will be about. Be specific for better results.
                </FormDescription>
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
                    className="min-h-[100px] bg-[#f7f7f7] border-0 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide more context about your video. This helps generate better content.
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-[#f7f7f7] border-0 h-11">
                      <SelectValue placeholder="Select a video style" />
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
                <FormDescription>
                  Choose a style that best fits your content
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video Duration</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Length</span>
                      <span className="font-medium">{field.value} seconds</span>
                    </div>
                    <Slider
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                      min={30}
                      max={60}
                      step={1}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>30s</span>
                      <span>60s</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {[30, 45, 60].map((value) => (
                        <Button
                          key={value}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => field.onChange(value)}
                          className={field.value === value ? "border-black" : ""}
                        >
                          {value}s
                        </Button>
                      ))}
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  Choose the length of your video
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-black hover:bg-black/90">
            Next Step
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}