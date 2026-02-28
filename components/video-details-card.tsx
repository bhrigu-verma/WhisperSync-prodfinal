import useModalStore from "@/store/modal-store";
import { File, Play, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface VideoDetailsCardTypes {
    id: string;
    fileName: string;
    createdAt: Date;
}

const VideoDetailsCard = ({ id, fileName, createdAt }: VideoDetailsCardTypes) => {
    const shortFileName = fileName.split(".")[0];
    const router = useRouter();

    const {onOpen} = useModalStore()

    const timeAgo = (date: Date) => {
        const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
        if (seconds < 60) return "just now";
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        return `${Math.floor(seconds / 86400)}d ago`;
    };

    return (
        <div
            className="group p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl hover:border-gray-600/50 hover:bg-gray-800 transition-all cursor-pointer"
            onClick={() => { router.push(`/videos/${id}`); }}
        >
            {/* Video Thumbnail */}
            <div className="relative mb-4 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex justify-center items-center bg-black/40 group-hover:bg-black/30 transition-colors">
                    <Play className="text-white/80 group-hover:text-white group-hover:scale-110 transition-all" size={32} />
                </div>
                <div className="w-full h-40 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg"></div>
            </div>

            {/* File Information */}
            <div className="flex items-center gap-3 mb-3">
                <File className="text-yellow-400 flex-shrink-0" size={20} />
                <div className="text-sm font-semibold text-white truncate">{shortFileName}</div>
            </div>
            
            {/* Uploaded Date */}
            <div className="text-xs text-gray-400 flex justify-between items-center">
                <div>{timeAgo(createdAt)}</div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onOpen("delete-video", { videoId: id, fileName }); 
                    }}
                    className="p-1.5 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors"
                >
                    <Trash className="h-3.5 w-3.5" />
                </button>
            </div>
        </div>
    );
};

export default VideoDetailsCard;
