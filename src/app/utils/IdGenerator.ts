export class IdGenerator {

  public static generate(length: number = 8): string {
    return this.getRandomId(length);
  }

  private static getRandomId(length: number): string {
    let id = (Math.random().toString(36).substring(2)).substring(0, length);
    if (id.length < length) {
      id += this.getRandomId(length - id.length);
    }
    return id;
  }
}
