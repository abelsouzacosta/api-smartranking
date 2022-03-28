export class Player {
  public _id: number;
  public phone_number: string;
  public email: string;
  public name: string;
  public ranking: string;
  public position: number;
  public photo_url: string;

  constructor() {
    this._id = this._id ? this._id : Math.floor(Math.random() * 101);
  }
}
