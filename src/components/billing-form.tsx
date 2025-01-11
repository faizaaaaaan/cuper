"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { CreditCard } from "lucide-react";

const formSchema = z.object({
  billingCycle: z.enum(["monthly", "yearly"]),
  amount: z.number(),
  cardNumber: z.string(),
  expiryDate: z.string().optional(),
  cvc: z.string().optional(),
});

interface BillingFormProps {
  defaultValues: {
    billingCycle: "monthly" | "yearly";
    amount: number;
    cardNumber: string;
  };
}

export function BillingForm({ defaultValues }: BillingFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.success("Payment method updated successfully");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="billingCycle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Billing Cycle</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-[#f7f7f7] border-0">
                    <SelectValue placeholder="Select billing cycle" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly (Save 20%)</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Information</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    disabled
                    className="bg-[#f7f7f7] border-0 pl-10"
                  />
                  <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="button" variant="outline" className="w-full">
          Update Payment Method
        </Button>
      </form>
    </Form>
  );
}