/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { ITokenData } from "@/redux/features/auth/types";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hook";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import LoaderText from "../base/loading-btn";
import { UserAvaterLG } from "../base/navbar/Avater";
import { DotPattern } from "../ui/dot-pattern";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

export function WelcomeDashboard() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const user = useAppSelector(useCurrentUser) as ITokenData | null;
  const [update, { isLoading }] = useUpdatePasswordMutation();
  const form = useForm();

  const onSubmit = async (values: any) => {
    console.log(values);

    try {
      const res = await update(values).unwrap();

      if (res.success) {
        toast.success("Password changed succesfully", { duration: 2000 });
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went worng", { duration: 3000 });
    } finally {
      form.reset();
      setOpen(false);
    }
  };

  return (
    user && (
      <div className="relative w-full h-full px-4 flex items-center justify-center pb-20">
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)] absolute inset-0 z-10"
          )}
        />

        <Card className=" relative w-full max-w-3xl z-30 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
          <CardHeader className="flex flex-row items-center gap-4">
            <UserAvaterLG userName={user.name || "User"} />
            <div className="pb-2">
              <CardTitle className="text-2xl">
                Welcome back, {user.name}!
              </CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Here's a quick overview of your dashboard. You can manage your
              projects, view analytics, or update your profile.
            </p>
          </CardContent>
          <CardFooter className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Button variant="outline" onClick={() => navigate("/")}>
              Go to Home
            </Button>

            <Dialog open={open}>
              <DialogTrigger asChild>
                <Button variant="default" onClick={() => setOpen(true)}>
                  Edit Password
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Update your password</DialogTitle>
                  <DialogDescription>
                    To keep your account secure update password
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form
                    className={cn("flex flex-col gap-6")}
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <div className="grid gap-6">
                      <FormField
                        control={form.control}
                        name="oldPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Old password</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="enter you old passwod"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Enter your new password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit">
                        <LoaderText isLoading={isLoading} text="Save changes" />
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>
    )
  );
}
