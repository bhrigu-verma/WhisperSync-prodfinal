// toAss.ts - Enhanced multilingual subtitle generator

interface ItemsType {
    start_time: string;
    end_time: string;
    content: string;
}

interface AssOptions {
    fontName: string;
    fontFamily?: string;
    fontSize: number;
    primaryColor: string;
    outlineColor: string;
    videoWidth?: number;
    videoHeight?: number;
    playResX?: number;
    playResY?: number;
}

// Convert seconds to ASS time format (H:MM:SS.CC)
const secondsToAssTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const centiseconds = Math.floor((seconds % 1) * 100);
    
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
};

// Escape ASS special characters
const escapeAssText = (text: string): string => {
    return text
        .replace(/\\/g, '\\\\')  // Escape backslashes first
        .replace(/\{/g, '\\{')
        .replace(/\}/g, '\\}')
        .replace(/\n/g, '\\N')
        .replace(/\r/g, '');
};

// Detect if text contains Hindi/Devanagari characters
const containsHindi = (text: string): boolean => {
    return /[\u0900-\u097F]/.test(text);
};

// Detect if text contains English characters
const containsEnglish = (text: string): boolean => {
    return /[A-Za-z]/.test(text);
};

// Apply appropriate font styling for multilingual content
const applyMultilingualStyling = (text: string, options: AssOptions): string => {
    const hasHindi = containsHindi(text);
    const hasEnglish = containsEnglish(text);
    
    // If mixed content, use font override
    if (hasHindi && hasEnglish) {
        // For mixed content, we'll use the primary font and rely on font fallback
        return text;
    } else if (hasHindi) {
        // Pure Hindi content - use Noto Sans Devanagari
        return `{\\fnNoto Sans Devanagari}${text}`;
    }
    
    // English or other content - use default font
    return text;
};

export function ToAss(items: ItemsType[], options: AssOptions): string {
    const {
        fontName = 'Roboto',
        fontFamily = 'Roboto',
        fontSize = 30,
        primaryColor = '&H00FFFFFF',
        outlineColor = '&H00000000',
        videoWidth = 384,
        videoHeight = 288,
        playResX = 384,
        playResY = 288
    } = options;

    // Use actual resolution for PlayRes
    const finalPlayResX = playResX || videoWidth;
    const finalPlayResY = playResY || videoHeight;

    // Calculate appropriate font size based on video resolution
    const adjustedFontSize = Math.max(16, Math.min(fontSize, finalPlayResY / 8));

    // Enhanced ASS Header with proper multilingual font handling
    const header = `[Script Info]
Title: Multilingual Subtitles
ScriptType: v4.00+
WrapStyle: 0
PlayResX: ${finalPlayResX}
PlayResY: ${finalPlayResY}
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,${fontName},${adjustedFontSize},${primaryColor},&H000000FF,${outlineColor},&H00000000,0,0,0,0,100,100,0,0,1,3,1,2,10,10,50,1
Style: Hindi,Noto Sans Devanagari,${adjustedFontSize},${primaryColor},&H000000FF,${outlineColor},&H00000000,0,0,0,0,100,100,0,0,1,3,1,2,10,10,50,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
`;

    // Convert items to ASS dialogue format with multilingual support
    const dialogues = items
        .filter(item => item && item.content && item.content.trim())
        .map(item => {
            const startTime = secondsToAssTime(parseFloat(item.start_time));
            const endTime = secondsToAssTime(parseFloat(item.end_time));
            let text = escapeAssText(item.content.trim());
            
            // Apply multilingual styling
            text = applyMultilingualStyling(text, options);
            
            // Determine which style to use
            const hasHindi = containsHindi(item.content);
            const hasEnglish = containsEnglish(item.content);
            const styleName = (hasHindi && !hasEnglish) ? 'Hindi' : 'Default';
            
            return `Dialogue: 0,${startTime},${endTime},${styleName},,0,0,0,,${text}`;
        })
        .join('\n');

    const result = header + dialogues;
    console.log('Generated ASS content preview:', result.substring(0, 500));
    return result;
}