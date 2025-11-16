import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function EmailSettings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [settings, setSettings] = useState({
    analysis_complete: true,
    weekly_summary: true,
    competitor_updates: true,
    marketing_emails: false,
  });

  // Fetch current user's email preferences
  const { data: preferences, isLoading } = useQuery({
    queryKey: ["email-preferences"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("email_preferences")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
  });

  // Update settings when preferences are loaded
  useEffect(() => {
    if (preferences) {
      setSettings({
        analysis_complete: preferences.analysis_complete,
        weekly_summary: preferences.weekly_summary,
        competitor_updates: preferences.competitor_updates,
        marketing_emails: preferences.marketing_emails,
      });
    }
  }, [preferences]);

  // Save preferences mutation
  const saveMutation = useMutation({
    mutationFn: async (newSettings: typeof settings) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("email_preferences")
        .upsert({
          user_id: user.id,
          ...newSettings,
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["email-preferences"] });
      toast({
        title: "Settings saved",
        description: "Your email preferences have been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error saving settings",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    saveMutation.mutate(settings);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Email Notification Settings</h1>
        <p className="text-muted-foreground">
          Manage your email preferences and choose what updates you'd like to receive.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Choose which email notifications you want to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex-1 space-y-1">
              <Label htmlFor="analysis-complete" className="text-base">
                Analysis Complete Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Get notified when your brand analysis is completed
              </p>
            </div>
            <Switch
              id="analysis-complete"
              checked={settings.analysis_complete}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, analysis_complete: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between space-x-4">
            <div className="flex-1 space-y-1">
              <Label htmlFor="weekly-summary" className="text-base">
                Weekly Summary Reports
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive a weekly summary of your AI visibility metrics
              </p>
            </div>
            <Switch
              id="weekly-summary"
              checked={settings.weekly_summary}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, weekly_summary: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between space-x-4">
            <div className="flex-1 space-y-1">
              <Label htmlFor="competitor-updates" className="text-base">
                Competitor Updates
              </Label>
              <p className="text-sm text-muted-foreground">
                Get alerts when your competitors' visibility changes
              </p>
            </div>
            <Switch
              id="competitor-updates"
              checked={settings.competitor_updates}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, competitor_updates: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between space-x-4">
            <div className="flex-1 space-y-1">
              <Label htmlFor="marketing-emails" className="text-base">
                Marketing & Product Updates
              </Label>
              <p className="text-sm text-muted-foreground">
                Stay informed about new features and industry insights
              </p>
            </div>
            <Switch
              id="marketing-emails"
              checked={settings.marketing_emails}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, marketing_emails: checked })
              }
            />
          </div>

          <Button 
            onClick={handleSave} 
            className="w-full"
            disabled={saveMutation.isPending}
          >
            {saveMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Preferences"
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Previews</CardTitle>
          <CardDescription>
            See what our notification emails look like
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Analysis Complete Email</h3>
            <p className="text-sm text-muted-foreground">
              You'll receive a beautifully formatted email with your brand's overall score,
              key insights, and a link to view the full analysis report.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Weekly Summary Email</h3>
            <p className="text-sm text-muted-foreground">
              A comprehensive weekly report showing total analyses performed, average scores,
              and your top-performing brand of the week.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
