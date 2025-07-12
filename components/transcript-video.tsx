"use client"
import { Download, Rocket } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import useTranscriptionStore from "@/store/transcription-store";
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

// Import fonts
//@ts-expect-error: Uploading roboto file
import roboto from "@/_fonts/Roboto-Regular.ttf"
//@ts-expect-error: Uploading robotoBold file
import robotoBold from "@/_fonts/Roboto-Bold.ttf"
//@ts-expect-error: Uploading noto sans devanagari file
import notoSansDevanagari from "@/_fonts/NotoSansDevanagari-Regular.ttf"
//@ts-expect-error: Uploading noto sans devanagari bold file
import notoSansDevanagariBold from "@/_fonts/NotoSansDevanagari-Bold.ttf"

import { useRouter } from "next/navigation";
import { ToAss } from "@/lib/toAss";
import toast from "react-hot-toast";

interface TranscriptVideoProps{
    videoUrl: string
    fileName: string
}

const TranscriptVideo = ({
    videoUrl,
    fileName
}: TranscriptVideoProps) => {
    const { transcriptions } = useTranscriptionStore();

    const [primaryColor, setPrimaryColor] = useState('#FFFFFF')
    const [outlineColor, setOutlineColor] = useState('#000000')
    const [fontSize, setFontSize] = useState(60)
    const [progress, setProgress] = useState(1);
    const [isTranscribed, setIsTranscribed] = useState(false)
    const [loading, setIsLoading] = useState(false)
    const [detectedLanguage, setDetectedLanguage] = useState('mixed')
    
    const videoRef = useRef(null)
    const ffmpegRef = useRef(new FFmpeg());
    const router = useRouter()

    // Enhanced language detection
    const detectLanguages = (text: string): { primary: string; hasEnglish: boolean; hasHindi: boolean } => {
        const hindiPattern = /[\u0900-\u097F]/;
        const englishPattern = /[A-Za-z]/;
        
        const hasHindi = hindiPattern.test(text);
        const hasEnglish = englishPattern.test(text);
        
        let primary = 'en';
        if (hasHindi && !hasEnglish) {
            primary = 'hi';
        } else if (hasHindi && hasEnglish) {
            primary = 'mixed';
        }
        
        return { primary, hasEnglish, hasHindi };
    };

    // Convert hex color to ASS format
    function toFFmpegColor(hex: string): string {
        const cleanHex = hex.replace('#', '');
        const r = parseInt(cleanHex.substring(0, 2), 16);
        const g = parseInt(cleanHex.substring(2, 4), 16);
        const b = parseInt(cleanHex.substring(4, 6), 16);
        return `&H00${b.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${r.toString(16).padStart(2, '0')}`;
    }

    // Language detection with multilingual support
    useEffect(() => {
        if (transcriptions.length > 0) {
            const sampleText = transcriptions.slice(0, 10).map(t => t.content).join(' ');
            const languageInfo = detectLanguages(sampleText);
            setDetectedLanguage(languageInfo.primary);
            console.log('Language analysis:', languageInfo);
        }
    }, [transcriptions]);

    useEffect(() => {
        //@ts-expect-error: video ref type
        videoRef.current.src = videoUrl;
        load()
    }, [videoUrl])

    const load = async () => {
        try {
            const ffmpeg = ffmpegRef.current;
            const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.4/dist/umd'
            
            await ffmpeg.load({
                coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
                wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
            });
            
            // Load all fonts with proper naming
            await ffmpeg.writeFile('roboto.ttf', await fetchFile(roboto));
            await ffmpeg.writeFile('roboto-bold.ttf', await fetchFile(robotoBold));
            await ffmpeg.writeFile('noto-sans-devanagari.ttf', await fetchFile(notoSansDevanagari));
            await ffmpeg.writeFile('noto-sans-devanagari-bold.ttf', await fetchFile(notoSansDevanagariBold));
            
            // Create font config file for ASS
            const fontConfig = `
[Script Info]
Title: Font Configuration
ScriptType: v4.00+

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,Roboto,${fontSize},&H00FFFFFF,&H000000FF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,2,0,2,10,10,50,1
Style: Hindi,Noto Sans Devanagari,${fontSize},&H00FFFFFF,&H000000FF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,2,0,2,10,10,50,1
            `;
            
            await ffmpeg.writeFile('fontconfig.ass', fontConfig);
            
            console.log('FFmpeg loaded successfully with multilingual fonts');
            
        } catch (error) {
            console.error('Error loading FFmpeg:', error);
            toast.error('Failed to load video processing engine');
        }
    }

    const transcode = async () => {
        if (!transcriptions || transcriptions.length === 0) {
            toast.error('No transcriptions available');
            return;
        }

        router.refresh();
        setIsLoading(true);
        setIsTranscribed(false);
        
        try {
            const ffmpeg = ffmpegRef.current;
            
            // Write video file
            await ffmpeg.writeFile(fileName, await fetchFile(videoUrl));
            
            // Get video metadata
            //@ts-expect-error: video ref type
            videoRef.current.src = videoUrl;
            await new Promise((resolve) => {
                //@ts-expect-error: video ref type
                videoRef.current.onloadedmetadata = resolve;
            });
            
            //@ts-expect-error: video ref type
            const duration = videoRef.current.duration;
            //@ts-expect-error: video ref type
            const videoWidth = videoRef.current.videoWidth || 1920;
            //@ts-expect-error: video ref type
            const videoHeight = videoRef.current.videoHeight || 1080;

            console.log('Video dimensions:', videoWidth, 'x', videoHeight);
            console.log('Video duration:', duration);
            console.log('Transcriptions count:', transcriptions.length);

            // Analyze content for multilingual support
            const sampleText = transcriptions.slice(0, 10).map(t => t.content).join(' ');
            const languageInfo = detectLanguages(sampleText);
            
            console.log('Language analysis:', languageInfo);
            
            // Generate ASS subtitles
            const assContent = ToAss(transcriptions, {
                fontName: 'Roboto',
                fontFamily: 'Roboto,Noto Sans Devanagari',
                fontSize: fontSize,
                primaryColor: toFFmpegColor(primaryColor),
                outlineColor: toFFmpegColor(outlineColor),
                videoWidth,
                videoHeight,
                playResX: videoWidth,
                playResY: videoHeight
            });
            
            console.log('Generated ASS content (first 300 chars):', assContent.substring(0, 300));
            
            // Write ASS file
            await ffmpeg.writeFile('subtitles.ass', assContent);

            // Set up progress tracking
            ffmpeg.on('log', ({ message }) => {
                const regexResult = /time=([0-9:.]+)/.exec(message);
                if (regexResult && regexResult[1]) {
                    const timeStr = regexResult[1];
                    const [hours, minutes, seconds] = timeStr.split(':').map(parseFloat);
                    const doneTotalSeconds = hours * 3600 + minutes * 60 + seconds;
                    const videoProgress = Math.min(doneTotalSeconds / duration, 0.99);
                    setProgress(videoProgress);
                }
            });

            // FFmpeg command for ASS subtitles with font directory
            const ffmpegArgs = [
                '-i', fileName,
                '-vf', `ass=subtitles.ass:fontsdir=.`,
                '-c:v', 'libx264',
                '-preset', 'fast',
                '-crf', '23',
                '-c:a', 'aac',
                '-b:a', '128k',
                '-movflags', '+faststart',
                'output.mp4'
            ];

            console.log('FFmpeg command:', ffmpegArgs.join(' '));
            
            await ffmpeg.exec(ffmpegArgs);
            
            // Read the output file
            const data = await ffmpeg.readFile('output.mp4');
            const outputBlob = new Blob([data], { type: 'video/mp4' });
            const outputUrl = URL.createObjectURL(outputBlob);
            
            //@ts-expect-error: video ref type
            videoRef.current.src = outputUrl;
            
            toast.success("Successfully added multilingual captions to video!");
            setProgress(1);
            setIsTranscribed(true);
            
        } catch (error) {
            console.error('Transcoding error:', error);
            toast.error('Failed to add captions to video');
            setProgress(1);
        } finally {
            setIsLoading(false);
        }
    }

    // Display detected language dynamically
    const getLanguageDisplay = () => {
        switch(detectedLanguage) {
            case 'hi': return 'हिंदी (HINDI)';
            case 'en': return 'ENGLISH';
            case 'mixed': return 'हिंदी + ENGLISH';
            default: return 'MULTILINGUAL';
        }
    };

    return ( 
        <div className="h-[60%] mt-44 md:mt-0 md:h-screen w-full flex justify-center items-center sticky md:top-6">
            <div className="flex flex-col gap-y-4">
                <div>
                    {/* Language detection display */}
                    <div className="flex justify-between mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
                        <div className="font-bold text-gray-700">
                            Detected Language:
                        </div>
                        <div className="font-bold text-blue-600">
                            {getLanguageDisplay()}
                        </div>
                    </div>
                    
                    {/* Transcription count display */}
                    <div className="flex justify-between mb-4 p-2 bg-gray-50 rounded">
                        <div className="font-semibold text-gray-700">
                            Subtitle Segments:
                        </div>
                        <div className="font-bold text-green-600">
                            {transcriptions.length}
                        </div>
                    </div>
                    
                    {/* Font Size Control */}
                    <div className="flex justify-between mb-4 p-2 bg-gray-50 rounded">
                        <div className="font-semibold text-gray-700">
                            Font Size:
                        </div>
                        <div className="flex items-center gap-2">
                            <input 
                                type="range"
                                min="20"
                                max="100"
                                value={fontSize}
                                onChange={(ev) => setFontSize(parseInt(ev.target.value))}
                                className="w-24"
                            />
                            <span className="text-sm font-medium w-8">{fontSize}px</span>
                        </div>
                    </div>
                    
                    {/* Color Controls */}
                    <div className="flex justify-between mb-2 p-2 bg-gray-50 rounded">
                        <div className="font-semibold text-gray-700">
                            Text Color:
                        </div>
                        <input 
                            type="color"
                            value={primaryColor}
                            onChange={(ev) => setPrimaryColor(ev.target.value)}
                            className="w-10 h-8 rounded border"
                        />
                    </div>
                    
                    <div className="flex justify-between mb-4 p-2 bg-gray-50 rounded">
                        <div className="font-semibold text-gray-700">
                            Outline Color:
                        </div>
                        <input 
                            type="color"
                            value={outlineColor}
                            onChange={(ev) => setOutlineColor(ev.target.value)}
                            className="w-10 h-8 rounded border"
                        />
                    </div>
                </div>

                {/* Video Player */}
                <div className="relative" style={{ width: "320px", height: "568px" }}>
                    <video
                        ref={videoRef}
                        controls
                        style={{ width: "100%", height: "100%" }}
                        className="rounded-lg border-2 border-gray-200"
                    />
                    {progress && progress < 1 && loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-lg">
                            <div className="flex flex-col gap-y-3 w-full items-center px-4">
                                <div className="text-white text-center font-semibold">
                                    Processing multilingual subtitles...
                                </div>
                                <div className="relative w-[85%]">
                                    <div className="h-6 bg-gray-300 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
                                            style={{ width: `${progress * 100}%` }}
                                        />
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-white text-sm font-bold">
                                            {Math.round(progress * 100)}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <Button 
                    disabled={loading || !transcriptions || transcriptions.length === 0} 
                    onClick={transcode} 
                    className="font-bold text-lg py-6" 
                    variant={'destructive'}
                >
                    <Rocket className="mr-2" />
                    {loading ? 'Processing...' : 'Apply Multilingual Captions'}
                </Button>
                
                {isTranscribed && (
                    <Button
                        onClick={() => {
                            const videoElement = videoRef.current;
                            //@ts-expect-error: video ref type
                            if (videoElement && videoElement.src) {
                                const anchor = document.createElement('a');
                                //@ts-expect-error: video ref type
                                anchor.href = videoElement.src;
                                anchor.download = `video_with_multilingual_subtitles.mp4`;
                                document.body.appendChild(anchor);
                                anchor.click();
                                document.body.removeChild(anchor);
                                toast.success('Download started!');
                            } else {
                                toast.error("No video available to download");
                            }
                        }}
                        className="font-bold text-lg py-6"
                        variant="outline"
                    >
                        <Download className="mr-2"/>
                        Download Video
                    </Button>        
                )}
            </div>     
        </div> 
    );
}
 
export default TranscriptVideo;