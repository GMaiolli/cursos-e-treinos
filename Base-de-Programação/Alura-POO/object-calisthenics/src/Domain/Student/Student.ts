import { Video } from "../Video/Video.js";
import { Email } from "../Email/Email.js";
import { WatchedVideos } from "./WatchedVideos.js";
import { FullName } from "./FullName.js";

export class Student {
  private email: Email;
  private bd: Date;
  private watchedVideos: WatchedVideos;
  public street: string;
  public number: string;
  public province: string;
  public city: string;
  public state: string;
  public country: string;
  private fullName: FullName;

  constructor(
    email: Email,
    bd: Date,
    fullName: FullName,
    street: string,
    number: string,
    province: string,
    city: string,
    state: string,
    country: string,
  ) {
    this.watchedVideos = new WatchedVideos();
    this.email = email;
    this.bd = bd;
    this.fullName = fullName;
    this.street = street;
    this.number = number;
    this.province = province;
    this.city = city;
    this.state = state;
    this.country = country;
  }

  public showFullName(): string {
    return this.fullName.toString();
  }

  public getEmail(): string {
    return this.email.toString();
  }

  public getBd(): Date {
    return this.bd;
  }

  public watch(video: Video, date: Date): void {
    this.watchedVideos.add(video, date);
  }

  public hasAccess(): boolean {
    if (this.watchedVideos.count() === 0) {
      return true;
    }
    return this.firstVIdeoWasWatchedInLessThan90Days();
  }

  private firstVIdeoWasWatchedInLessThan90Days(): boolean {
    const firstDate = this.watchedVideos.dateOfFirstVideo();
    const today = new Date();
    const diffInMs = today.getTime() - firstDate.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    return diffInDays < 90;
  }

  public age(): number {
    return new Date().getFullYear() - this.bd.getFullYear();
  }
}
