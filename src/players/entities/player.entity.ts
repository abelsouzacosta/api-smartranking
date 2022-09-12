import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  collection: 'players',
})
export class Player {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  phone_number: string;

  @Prop({ required: false, type: String })
  ranking?: string;

  @Prop({ required: false, type: Number })
  ranking_position?: number;

  @Prop({ required: false, type: String })
  photo_url?: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
