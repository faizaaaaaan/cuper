import React from "react";
import { cn } from "@/lib/utils";

export const FormError = ({ message }: { message: any }) => {
  return (
    <div
      className={cn(
        // if message startes with "The Email is already" make div block else hidden
        message.startsWith("The Email is already") ? "block text-sm" : "hidden",
      )}
    >
      {/* a light red box with a white text that says "Error 🔐" and a paragraph that says "Opps! Something went wrong. Please try again later." */}
      <div
        className="relative rounded-md border border-red-600 bg-red-200 px-4 py-3 text-gray-900 dark:border-red-700/40 dark:bg-red-600/20 dark:text-gray-300"
        role="alert"
      >
        <span className="block sm:inline">
          <span className="font-bold">Opps! </span>
          {message}
        </span>
      </div>
    </div>
  );
};
