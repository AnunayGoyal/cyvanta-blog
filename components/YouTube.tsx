
interface YouTubeProps {
    value: {
        url: string;
    };
}

export default function YouTube({ value }: YouTubeProps) {
    const { url } = value;
    if (!url) return null;

    // Extract ID from URL
    const match = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?]+)/);
    const id = match ? match[1] : null;

    if (!id) return null;

    return (
        <div className="my-8 aspect-video w-full rounded-lg overflow-hidden border border-white/10 shadow-lg">
            <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${id}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></iframe>
        </div>
    );
}
