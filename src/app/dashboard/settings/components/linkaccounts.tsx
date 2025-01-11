import React from "react";
import AvailableLinkingOptions from "./avlinkoptions";
import AlreadyLinkedOptions from "./allinkedoptions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const providers = ["google"] as const;

export default function LinkAccountComp(linkeddata: any) {
  const accounts = linkeddata.accounts;
  // remove already linked accounts
  const linkedProviders = accounts?.map(
    (account: any) => account.provider
  );
  const filteredProviders = providers.filter(
    (provider) => !linkedProviders?.includes(provider)
  );

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="space-y-1 px-0">
        <div className="flex items-center space-x-2">
          <CardTitle>Connected Accounts</CardTitle>
        </div>
        <CardDescription>
          Manage your connected third-party accounts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-0">
        <div className="flex flex-col p-1">
          <AlreadyLinkedOptions account={accounts} />

          <AvailableLinkingOptions providers={filteredProviders} />
        </div>
      </CardContent>
    </Card>
  );
}
