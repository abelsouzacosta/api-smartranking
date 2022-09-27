import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Category } from 'src/categories/entities/category.entity';
import { Player } from 'src/players/entities/player.entity';
import { ChallengeStatusEnum } from '../domain/enums/challenge-status.enum';

@Schema({
  collection: 'challenges',
  timestamps: true,
})
export class Challenge {
  @Prop({ required: true, type: Date })
  date: Date;

  @Prop({ required: true, type: String })
  status: ChallengeStatusEnum;

  @Prop({ required: true, type: Date })
  solicitation_date: Date;

  @Prop({ required: false, type: Date })
  acceptation_date: Date;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'Player' })
  requester: Player;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop({ required: true, type: [mongoose.Types.ObjectId], ref: 'Player' })
  players: Player[];
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);
