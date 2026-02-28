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
  
  <div id="upload" className="relative max-w-2xl mx-auto mt-8 px-4">
    <label className="flex flex-col items-center justify-center w-full h-56 sm:h-64 rounded-2xl cursor-pointer border-2 border-dashed border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300">
      <div className="flex flex-col items-center justify-center pt-6 pb-8 space-y-3">
        <UploadCloud className="w-12 h-12 text-yellow-400 mb-2" />
        <p className="text-base font-semibold text-white">
          <span className="underline decoration-yellow-400/50">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-neutral-400">
          MP4 up to 500MB • Optimized for short-form video
        </p>
      </div>
      <input
        type="file"
        className="hidden"
        accept="video/*"
        onChange={upload}
      />
    </label>
  </div>

    
  );
};

export default UploadSection;
