"use client";

import React from "react";
import { UploadCloud } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import useLoadingStore from "@/store/loading-store";
import { StoreTranscription } from "@/actions/StoreTranscriptionFile";
import useModalStore from "@/store/modal-store";
import { CardSpotlight } from "@/components/ui/card-spotlight";



const UploadSection = () => {
  const { setLoading, setLoadingType, setLoadingSubHeading } = useLoadingStore();
  const router = useRouter();
  const { data: session } = useSession();
  const { onOpen} = useModalStore()

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      let file = null
      if (!session) {
        return onOpen("login-warning")
      }
  
      file = e.target?.files?.[0];
      if (!file) {
        toast.error("No file selected.");
        setLoading(false);
        return;
      }
  
      // Validate email existence
      const userEmail = session.user?.email;
      if (!userEmail) {
        toast.error("Unable to retrieve user email. Please log in again.");
        setLoading(false);
        return;
      }

      // Check video format (aspect ratio)
    const isValidFormat = await new Promise((resolve) => {
      const video = document.createElement("video");
      video.preload = "metadata";

      video.onloadedmetadata = () => {
        const aspectRatio = video.videoWidth / video.videoHeight;
        resolve(true); // Vertical videos have aspect ratio < 1
      };

      video.onerror = () => {
        resolve(false); // Invalid video format
      };

      video.src = URL.createObjectURL(file);
    });

    if (!isValidFormat) {
      onOpen("video-format-warning")
      setLoading(false);
      return 
    }
  
      setLoading(true);
      setLoadingType("Uploading File")
  
      const presignedUrl = await axios.post("/api/getPresignedUrl", {
        fileType: file.type,
        fileName: file.name
      });
  
      const res = await fetch(presignedUrl.data.url, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": "video/mp4" },
      });
      
      setLoadingType("Transcribing Video")
      //@ts-expect-error: setsubheading type
      setLoadingSubHeading("(Please wait it may take some time,it may take 4-5 min)");
      
      await StoreTranscription(presignedUrl.data.fileName, userEmail);
      
      //@ts-expect-error: setSubheading null
      setLoadingSubHeading(null)
      setLoadingType("Storing Transcrib File")
      if (res.ok) {
        setLoadingType("Redirecting to video page")
        return router.push(`/videos/${presignedUrl.data.videoId}`);
      } else {
        toast.error("Failed to upload the video.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Something went wrong while uploading.");
      setLoading(false);
    }
  };
    

  return (
  
  <div className="relative max-w-3xl mx-auto mt-8">
  <CardSpotlight className="h-96 w-96">
    <label className="flex flex-col items-center justify-center w-full h-64 rounded-lg cursor-pointer bg-gradient-to-br from-sand-500 via-orange-300 to-yellow-400 hover:scale-105 hover:bg-opacity-90 shadow-xl transition-all duration-300 transform hover:rotate-2">
      <div className="flex flex-col items-center justify-center pt-6 pb-8 space-y-3">
        <UploadCloud className="w-16 h-16 text-white mb-4 animate-pulse" />
        <p className="text-lg font-semibold text-white drop-shadow-md">
          <span className="underline">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-white opacity-90">
          MP4 up to 500MB
        </p>
      </div>
      <input
        type="file"
        className="hidden"
        accept="video/*"
        onChange={upload}
      />
    </label>
  </CardSpotlight>
  
</div>

    
  );
};

export default UploadSection;
