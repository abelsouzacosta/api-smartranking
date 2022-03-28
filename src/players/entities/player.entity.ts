export class Player {
  readonly _id: string;
  readonly phone_number: string;
  readonly email: string;
  readonly name: string;
  readonly ranking: string;
  readonly position: number;
  readonly photo_url: string;

  constructor() {
    this._id = this._id ? this._id : Math.floor(Math.random() * 101).toString();
  }
}
