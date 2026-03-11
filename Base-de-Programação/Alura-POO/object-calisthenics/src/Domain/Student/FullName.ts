export class FullName {
    private fisrtName: string;
    private lastName: string;

    constructor(fisrtName: string, lastName: string) {
        this.fisrtName = fisrtName;
        this.lastName = lastName;
    }

    public toString(): string {
        return `${this.fisrtName} ${this.lastName}`;
    }
}