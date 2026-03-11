import { Student } from "../Student/Student.js";
import { Video } from "./Video.js";
import { VideoRepository } from "./VideoRepository.js";

export class InMemoryVideoRepository implements VideoRepository {
  private videos: Video[] = [];

  public add(video: Video): void {
    this.videos.push(video);
  }

  public videosFor(student: Student): Video[] {
    const age = student.age();
    return this.videos.filter((video) => video.getAgeLimit() <= age);
  }
}
