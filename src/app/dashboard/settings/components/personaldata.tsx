"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader, User } from "lucide-react";
import UpdateProfile from "@/action/updateprofile";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const updateData = z.object({
  name: z.string(),
  email: z.string(),
});

type formValues = z.infer<typeof updateData>;

export default function PersonalData(user: any) {
  const userdata = user.user;
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    register,
    formState,
  } = useForm<formValues>({
    resolver: zodResolver(updateData),
    mode: "onChange",
    defaultValues: {
      name: userdata.name,
      email: userdata.email,
    },
  });

  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);

  const onSubmit = async (data: formValues) => {
    setLoading(true);
    await UpdateProfile(data)
      .then((res) => {
        if (res.error) {
          toast(res.error);
        } else {
          toast(res.success);
        }
      })
      .catch((e) => {
        toast.error("An error occurred while updating your profile");
      })
      .finally(() => {
        setLoading(false);
        router.refresh();
      });
  };

  React.useEffect(() => {
    if (formState.isDirty) {
      setDisabled(false);
    }
  }, [formState.isDirty]);

  const avatar = userdata.image;

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="space-y-1 px-0">
        <div className="flex items-center space-x-2">
          <CardTitle>Personal Information</CardTitle>
        </div>
        <CardDescription>
          Update your personal details and contact information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-0">
        <div className="flex flex-col gap-2 p-2">
          <form
            className="flex flex-col gap-2 w-full md:w-[80%] lg:w-[70%]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-1">
              <p className="text-sm text-muted-foreground">Name</p>
              <input
                className="rounded-md border p-1 px-2 text-base focus:border-muted-foreground focus:outline-none"
                type="text"
                placeholder="Name"
                {...register("name")}
              />
            </div>

            <div className="flex items-center md:flex-row flex-col gap-2 w-full">
              <div className="flex flex-col gap-1 flex-1 w-full">
                <p className="text-sm text-muted-foreground">Email</p>
                <input
                  className="rounded-md border p-1 px-2 text-base focus:border-muted-foreground focus:outline-none"
                  type="email"
                  placeholder="Email"
                  disabled
                  {...register("email")}
                />
              </div>
              <div className="flex flex-col gap-1 flex-1 w-full">
                <p className="text-sm text-muted-foreground">Account ID</p>
                <input
                  className="rounded-md border p-1 px-2 text-base focus:border-muted-foreground focus:outline-none"
                  type="text"
                  placeholder="User Id"
                  disabled
                  value={userdata.id}
                />
              </div>
            </div>

            <Button
              className="mb-4 mt-4 flex w-max gap-1"
              type="submit"
              disabled={disabled || loading}
            >
              {loading && <Loader className="animate-spin" size={15} />}
              {loading ? "Updating" : "Update Data"}
            </Button>
          </form>
        </div>
        
      </CardContent>
      
    </Card>
  );
}
