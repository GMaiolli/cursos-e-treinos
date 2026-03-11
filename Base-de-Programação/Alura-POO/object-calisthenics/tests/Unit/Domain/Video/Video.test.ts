import { describe, expect, it } from "vitest";
import { Video } from "../../../../src/Domain/Video/Video.js";

describe("Video", () => {
  it("change visibility must work", () => {
    const video = new Video();
    video.publish();

    expect(video.isPublic()).toBe(true);
  });
});