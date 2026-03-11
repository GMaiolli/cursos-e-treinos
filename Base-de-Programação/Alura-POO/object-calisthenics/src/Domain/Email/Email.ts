export class Email {
  private readonly address: string;

  constructor(address: string) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
      throw new Error("Invalid e-mail address");
    }

    this.address = address;
  }

  public toString(): string {
    return this.address;
  }
}