import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/server/auth";
import { getUserById, linkedAccounts } from "@/server/user";
import ChangePasswordComp from "./components/changepassword";
import DeleteAccount from "./components/deleteaccount";
import PersonalData from "./components/personaldata";
import AnimatedContent from "./components/AnimatedContent";
import Linkaccounts from "./components/linkaccounts";
import LogoutSection from "./components/LogoutSection";

export default async function SettingsPage() {
  const session = await auth();
  const user = await getUserById(session?.user?.id as string);
  const linkedData = await linkedAccounts(session?.user?.id as string);

  return (
    <div className="flex-1 p-8 pt-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-1">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <AnimatedContent>
          <div className="p-6">
            <Tabs defaultValue="personal" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4 lg:w-[400px] bg-[#f7f7f7] p-1 rounded-lg">
                <TabsTrigger
                  value="personal"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition-all"
                >
                  Personal
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition-all"
                >
                  Security
                </TabsTrigger>
                <TabsTrigger
                  value="integration"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition-all"
                >
                  Integration
                </TabsTrigger>
                <TabsTrigger
                  value="danger"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition-all"
                >
                  Danger Zone
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-6">
                <PersonalData user={user} />
                <LogoutSection />
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <ChangePasswordComp user={user} />
              </TabsContent>

              <TabsContent value="integration" className="space-y-6">
                <Linkaccounts accounts={linkedData} />
              </TabsContent>

              <TabsContent value="danger" className="space-y-6">
                <DeleteAccount user={user} />
              </TabsContent>
            </Tabs>
          </div>
        </AnimatedContent>
      </div>
    </div>
  );
}