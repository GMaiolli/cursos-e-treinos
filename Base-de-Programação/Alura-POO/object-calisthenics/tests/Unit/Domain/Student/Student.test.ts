import { beforeEach, describe, expect, it } from "vitest";
import { Student } from "../../../../src/Domain/Student/Student.js";
import { Video } from "../../../../src/Domain/Video/Video.js";
import { Email } from "../../../../src/Domain/Email/Email.js";
import { FullName } from "../../../../src/Domain/Student/FullName.js";

describe("Student", () => {
  let student: Student;

  beforeEach(() => {
    student = new Student(
      new Email("email@example.com"),
      new Date("1997-10-15"),
      new FullName("Vinicius", "Dias"),
      "Rua de Exemplo",
      "71B",
      "Meu Bairro",
      "Minha Cidade",
      "Meu estado",
      "Brasil"
    );
  });

  it("student without watched videos has access", () => {
    expect(student.hasAccess()).toBe(true);
  });

  it("student with first watched video in less than 90 days has access", () => {
    const date = new Date();
    date.setDate(date.getDate() - 89);
    student.watch(new Video(), date);

    expect(student.hasAccess()).toBe(true);
  });

  it("student with first watched video in less than 90 days but other videos watched has access", () => {
    const first = new Date();
    const second = new Date();
    const third = new Date();
    first.setDate(first.getDate() - 89);
    second.setDate(second.getDate() - 60);
    third.setDate(third.getDate() - 30);

    student.watch(new Video(), first);
    student.watch(new Video(), second);
    student.watch(new Video(), third);

    expect(student.hasAccess()).toBe(true);
  });

  it("student with first watched video in 90 days does not have access", () => {
    const date = new Date();
    date.setDate(date.getDate() - 90);
    student.watch(new Video(), date);

    expect(student.hasAccess()).toBe(false);
  });

  it("student with first watched video in 90 days but other videos watched does not have access", () => {
    const first = new Date();
    const second = new Date();
    const third = new Date();
    first.setDate(first.getDate() - 90);
    second.setDate(second.getDate() - 60);
    third.setDate(third.getDate() - 30);

    student.watch(new Video(), first);
    student.watch(new Video(), second);
    student.watch(new Video(), third);

    expect(student.hasAccess()).toBe(false);
  });
});