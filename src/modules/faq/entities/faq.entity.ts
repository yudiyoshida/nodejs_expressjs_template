export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export class FaqEntity {
  private _props: Faq;

  constructor(props: Partial<Faq>) {
    this._props = props as Faq;
  }

  // Getters.
  get question(): string {
    return this._props.question;
  }
  get answer(): string {
    return this._props.answer;
  }
}
