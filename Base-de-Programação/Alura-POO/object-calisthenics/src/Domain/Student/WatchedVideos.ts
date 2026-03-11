import { Video } from "../Video/Video.js";

export class WatchedVideos {
    private videos: Map<Video, Date>;

    public constructor() {
        this.videos = new Map();
    }

    public add(video: Video, date: Date): void {
        this.videos.set(video, date);
    }

    public count(): number {
        return this.videos.size;
    }

    public dateOfFirstVideo(): Date {
        const dates = Array.from(this.videos.values());
        dates.sort((a, b) => a.getTime() - b.getTime());
        return dates[0];
    }
}