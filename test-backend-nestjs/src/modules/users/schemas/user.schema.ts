import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true }) // auto create_at and auto update_at
export class User {
  // @Prop([String])
  // tags: string[];
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  password: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  email: string;

  @Prop({ default: 'LOCAL' })
  accountType: string;

  @Prop({ default: 'USERS' })
  role: string;

  @Prop()
  image: string;

  @Prop({ default: false })
  isActive: boolean;

  @Prop()
  codeId: string;

  @Prop()
  codeExpired: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
