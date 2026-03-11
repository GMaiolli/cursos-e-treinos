export class Video {
  private visibility = false;
  private ageLimit = 0;

  public publish() : void {
    this.visibility = true;
  }

  public isPublic(): boolean {
    return this.visibility === true;
  }

  public getAgeLimit(): number {
    return this.ageLimit;
  }

  public setAgeLimit(ageLimit: number): void {
    this.ageLimit = ageLimit;
  }
}