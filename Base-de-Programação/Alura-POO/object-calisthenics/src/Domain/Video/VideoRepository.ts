import { Student } from "../Student/Student.js";
import { Video } from "./Video.js";

export interface VideoRepository {
  add(video: Video): void;
  videosFor(student: Student): Video[];
}