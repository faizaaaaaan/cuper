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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Wand2 } from "lucide-react";

const formSchema = z.object({
  font: z.string().min(1, {
    message: "Please select a font.",
  }),
  subtitlePosition: z.enum(["top", "middle", "bottom"], {
    required_error: "Please select a subtitle position.",
  }),
  subtitleColor: z.string(),
  voice: z.enum(["male_us", "female_us"], {
    required_error: "Please select a voice.",
  }),
});

interface OptimizeStepProps {
  onBack: () => void;
  onComplete: (data: z.infer<typeof formSchema>) => void;
}

export function OptimizeStep({ onBack, onComplete }: OptimizeStepProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      font: "",
      subtitlePosition: "bottom",
      subtitleColor: "#FFFFFF",
      voice: "male_us",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onComplete(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="font"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Font Style</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 bg-[#F3F4F6] border-0">
                      <SelectValue placeholder="Select a font" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="montserrat">Montserrat</SelectItem>
                    <SelectItem value="opensans">Open Sans</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose a font that matches your video style
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subtitlePosition"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Subtitle Position</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: "top", preview: "bg-gray-300 top-0" },
                      { value: "middle", preview: "bg-gray-300 top-1/2 -translate-y-1/2" },
                      { value: "bottom", preview: "bg-gray-300 bottom-0" },
                    ].map((position) => (
                      <div
                        key={position.value}
                        onClick={() => field.onChange(position.value)}
                        className={`
                          relative cursor-pointer rounded-lg overflow-hidden
                          ${field.value === position.value ? 'ring-2 ring-black' : 'hover:ring-2 hover:ring-gray-200'}
                        `}
                      >
                        <div className="bg-[#F3F4F6] aspect-video relative">
                          <div className={`absolute left-0 right-0 h-4 ${position.preview}`} />
                        </div>
                        <div className="text-center py-2 text-sm capitalize">
                          {position.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subtitleColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subtitle Color</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-6 gap-4">
                    {[
                      "#FFFFFF",
                      "#000000",
                      "#FF0000",
                      "#00FF00",
                      "#0000FF",
                      "#FFFF00",
                    ].map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => field.onChange(color)}
                        className={`
                          w-12 h-12 rounded-lg border border-gray-200
                          ${field.value === color ? 'ring-2 ring-black' : 'hover:ring-2 hover:ring-gray-200'}
                        `}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="voice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Voice Selection</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 bg-[#F3F4F6] border-0">
                      <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male_us">Male (US)</SelectItem>
                    <SelectItem value="female_us">Female (US)</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose a voice for your video narration
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="h-11 px-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous Step
          </Button>
          <Button 
            type="submit" 
            className="h-11 px-8 bg-black hover:bg-black/90"
          >
            <Wand2 className="mr-2 h-4 w-4" />
            Generate Video
          </Button>
        </div>
      </form>
    </Form>
  );
}