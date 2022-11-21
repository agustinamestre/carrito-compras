export default class User {
    constructor(
      public readonly id: number | null,
      public name: string,
      public email: string,
      private readonly password: string,
    ) {}
  }