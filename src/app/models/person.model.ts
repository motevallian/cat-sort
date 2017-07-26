export class Person {
  public name: string;
  public gender: 'Male' | 'Female';
  public age: number;
  public pets?: Pet[];
}

export class Pet {
  public name: string;
  public type: string;
}
