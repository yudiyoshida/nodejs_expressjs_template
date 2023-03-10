/* eslint-disable @typescript-eslint/indent */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Faq {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 512,
  })
  question: string;

  @Column({
    type: 'text',
  })
  answer: string;
}
