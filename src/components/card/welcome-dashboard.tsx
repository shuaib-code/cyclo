import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { ITokenData } from "@/redux/features/auth/types";
import { useAppSelector } from "@/redux/hook";
import { UserAvaterLG } from "../base/navbar/Avater";
import { DotPattern } from "../ui/dot-pattern";

export function WelcomeDashboard() {
  const user = useAppSelector(useCurrentUser) as ITokenData | null;

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
          <CardFooter className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Button variant="outline">View Projects</Button>
            <Button variant="outline">Check Analytics</Button>
            <Button>Update Profile</Button>
          </CardFooter>
        </Card>
      </div>
    )
  );
}
