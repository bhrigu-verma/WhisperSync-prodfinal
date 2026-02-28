"use client";
import { getAllVideosOfUser } from "@/actions/getAllVideosOfUser";
import VideoDetailsCard from "@/components/video-details-card";
import { UploadCloud } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import DeleteVideoModal from "@/components/modals/delete-video-modal";

interface videoType {
    id: string;
    fileName: string;
    UserId: string;
    createdAt: Date;
    updatedAt: Date;
}


const Dashboard = () => {
  const { data: session } = useSession();
  const [allVideos, setAllVideos] = useState<videoType[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      if (session?.user?.id) {
        const data = await getAllVideosOfUser(session.user.id);
        if (data) {
          setAllVideos(data);
        }
      }
    };

    fetchVideos();
  }, [session?.user?.id]);

  const handleVideoDeleted = (videoId: string) => {
    setAllVideos((prevVideos) => prevVideos.filter((video) => video.id !== videoId));
  };

  // @ts-expect-error: plan type
  const plan = session?.user?.plan || "free";

  return (
    <div className="w-full h-full bg-gray-900 text-white overflow-y-scroll pb-10">
      <div className="max-w-7xl mx-auto mt-5 px-4 sm:px-6">
        {/* Plan Info and User Details */}
        <div className="bg-gray-800 p-4 sm:p-6 rounded-xl mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold">
              {(session?.user?.name || "U").charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-lg font-bold">{session?.user?.name || "User"}</div>
              <div className="text-sm text-gray-400">{session?.user?.email}</div>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-lg font-bold">
              Plan: <span className="text-yellow-400">{plan}</span>
            </div>
            <Link href="/#pricing" className="text-blue-400 hover:underline text-sm">
              Upgrade Plan →
            </Link>
          </div>
        </div>

        {/* Usage Meter */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 sm:p-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Videos this month</span>
            <span className="text-sm font-medium text-white">
              {allVideos.length} / {plan === "Enterprise" ? "∞" : plan === "Pro" ? "30" : "3"}
            </span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(
                  (allVideos.length / (plan === "Enterprise" ? 999 : plan === "Pro" ? 30 : 3)) * 100,
                  100
                )}%`,
              }}
            />
          </div>
        </div>

        {/* Videos Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Videos</h2>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-300"
            >
              <UploadCloud className="h-4 w-4" />
              Upload New
            </Link>
          </div>
          <div className="mt-4">
            {allVideos?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {allVideos.map((v) => (
                  <VideoDetailsCard
                    key={v.id}
                    id={v.id}
                    fileName={v.fileName}
                    createdAt={v.createdAt}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 rounded-xl border border-dashed border-gray-700">
                <UploadCloud className="h-12 w-12 text-gray-500 mb-4" />
                <p className="text-lg font-medium text-gray-300 mb-1">No videos yet</p>
                <p className="text-sm text-gray-500 mb-6">Upload your first video to get started</p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-yellow-300"
                >
                  Upload a Video
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <DeleteVideoModal onVideoDeleted={handleVideoDeleted} />
    </div>
  );
};

export default Dashboard;

