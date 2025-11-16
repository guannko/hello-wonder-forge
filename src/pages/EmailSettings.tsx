import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Bell, TrendingUp } from "lucide-react";

export default function EmailSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    analysisComplete: true,
    weeklySummary: true,
    competitorUpdates: false,
    marketingEmails: false,
  });

  const handleSave = () => {
    // In production, save to database
    localStorage.setItem('emailSettings', JSON.stringify(settings));
    toast({
      title: "Settings Saved",
      description: "Your email preferences have been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Email Notifications</h1>
        <p className="text-muted-foreground">
          Manage your email notification preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Mail className="h-6 w-6 text-primary" />
            <div>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose which emails you want to receive
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Bell className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="space-y-1">
                <Label htmlFor="analysis-complete" className="text-base font-medium">
                  Analysis Complete
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when your brand analysis is ready
                </p>
              </div>
            </div>
            <Switch
              id="analysis-complete"
              checked={settings.analysisComplete}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, analysisComplete: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <TrendingUp className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="space-y-1">
                <Label htmlFor="weekly-summary" className="text-base font-medium">
                  Weekly Summary
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive a weekly summary of your brand performance
                </p>
              </div>
            </div>
            <Switch
              id="weekly-summary"
              checked={settings.weeklySummary}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, weeklySummary: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Bell className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="space-y-1">
                <Label htmlFor="competitor-updates" className="text-base font-medium">
                  Competitor Updates
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get alerts when competitors' scores change significantly
                </p>
              </div>
            </div>
            <Switch
              id="competitor-updates"
              checked={settings.competitorUpdates}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, competitorUpdates: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="space-y-1">
                <Label htmlFor="marketing-emails" className="text-base font-medium">
                  Marketing & Tips
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive tips and best practices for improving AI visibility
                </p>
              </div>
            </div>
            <Switch
              id="marketing-emails"
              checked={settings.marketingEmails}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, marketingEmails: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Preferences</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Email Preview</CardTitle>
          <CardDescription>
            Examples of emails you'll receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-lg p-4 bg-muted/30">
            <h4 className="font-semibold mb-2">Analysis Complete Email</h4>
            <p className="text-sm text-muted-foreground">
              You'll receive a professional email with your brand score, key findings, and a link to view the full analysis.
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-muted/30">
            <h4 className="font-semibold mb-2">Weekly Summary Email</h4>
            <p className="text-sm text-muted-foreground">
              A comprehensive weekly report showing your total analyses, average scores, trends, and top performing brands.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
