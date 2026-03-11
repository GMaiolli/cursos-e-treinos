import { describe, expect, it } from "vitest";
import { Student } from "../../../../src/Domain/Student/Student.js";
import { InMemoryVideoRepository } from "../../../../src/Domain/Video/InMemoryVideoRepository.js";
import { Video } from "../../../../src/Domain/Video/Video.js";

describe("InMemoryVideoRepository", () => {
  it("finding videos for a student must filter age limit", () => {
    const repository = new InMemoryVideoRepository();

    for (let i = 21; i >= 17; i -= 1) {
      const video = new Video();
      video.setAgeLimit(i);
      repository.add(video);
    }


    const student = new Student(
      "email@example.com",
      new Date(2007, 1, 1),
      "Vinicius",
      "Dias",
      "Rua de Exemplo",
      "71B",
      "Meu Bairro",
      "Minha Cidade",
      "Meu estado",
      "Brasil"
    );

    const videoList = repository.videosFor(student);

    expect(videoList).toHaveLength(3);

    expect(student.age()).toBe(19);
  });
});
