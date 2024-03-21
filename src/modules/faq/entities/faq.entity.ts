import { Expose } from 'class-transformer';

export abstract class Faq {
  @Expose() id!: string;
  @Expose() question!: string;
  @Expose() answer!: string;
}

export class FaqEntity extends Faq {
  constructor() {
    super();
  }
}
