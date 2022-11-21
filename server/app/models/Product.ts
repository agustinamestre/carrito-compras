export enum Status {
    Enabled = "ENABLED",
    Disabled = "DISABLED",
  }

export default class Product {
    constructor(
      public readonly id: number | null,
      public name: string,
      public description: string,
      public status: Status,
      public stock: number,
      public unit_price: number,
      public readonly created_at: Date = new Date(),
      public readonly updatated_at: Date = new Date()
    ) {}
  }

// 	"id": "prd-....", // el prd se concatena a algo autogenerado