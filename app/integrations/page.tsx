
'use client';

import { Button } from "@/components/ui/button";
import { Youtube, Instagram, ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Integrations = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  
  const { data: integrations } = useQuery({
    queryKey: ["socialIntegrations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("social_integrations")
        .select("*");
      
      if (error) throw error;
      return data;
    },
  });

  const handleYoutubeConnect = async () => {
    console.log("Connecting to Youtube...");
    toast.info("YouTube integration coming soon!");
  };

  const handleInstagramConnect = async () => {
    console.log("Connecting to Instagram...");
    toast.info("Instagram integration coming soon!");
  };

  const isConnected = (platform: string) => {
    return integrations?.some(integration => integration.platform === platform);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-2xl mx-auto p-6">
        <Button
          variant="ghost"
          className="mb-6 text-gray-300 hover:text-white"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Social Media Integrations</h1>
          <p className="text-gray-400">Connect your social media accounts to automatically share your content.</p>

          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-gray-700 bg-gray-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Youtube className="h-8 w-8 text-red-500" />
                  <div>
                    <h3 className="font-medium">YouTube</h3>
                    <p className="text-sm text-gray-400">Auto-post your videos to YouTube</p>
                  </div>
                </div>
                <Button
                  variant={isConnected('youtube') ? "destructive" : "secondary"}
                  onClick={handleYoutubeConnect}
                  className="min-w-[100px]"
                >
                  {isConnected('youtube') ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
            </div>

            <div className="p-6 rounded-lg border border-gray-700 bg-gray-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Instagram className="h-8 w-8 text-pink-500" />
                  <div>
                    <h3 className="font-medium">Instagram</h3>
                    <p className="text-sm text-gray-400">Share your content on Instagram</p>
                  </div>
                </div>
                <Button
                  variant={isConnected('instagram') ? "destructive" : "secondary"}
                  onClick={handleInstagramConnect}
                  className="min-w-[100px]"
                >
                  {isConnected('instagram') ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
