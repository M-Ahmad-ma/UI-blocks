"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';

export default function ExampleTabs() {
  return (
    <div className="max-w-md space-y-4">
      <h2 className="text-xl font-semibold">Profile Settings</h2>

      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
      
        <TabsContent value="account">
          <div className="rounded-md border p-4">
            <h3 className="font-medium mb-2">Account Info</h3>
            <p className="text-sm opacity-80">
              Update your personal details and profile information.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="rounded-md border p-4">
            <h3 className="font-medium mb-2">Security Settings</h3>
            <p className="text-sm opacity-80">
              Manage passwords, 2FA, and login preferences.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="billing">
          <div className="rounded-md border p-4">
            <h3 className="font-medium mb-2">Billing Details</h3>
            <p className="text-sm opacity-80">
              View invoices, subscriptions, and payment methods.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
