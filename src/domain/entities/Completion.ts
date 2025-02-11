import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert } from "typeorm";
import { Lesson } from "./Lesson";

@Entity()
export class Completion {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  userId!: string;

  @ManyToOne(() => Lesson, (lesson) => lesson.completions)
  lesson!: Lesson;

  @BeforeInsert()
  validate() {
    if (!this.userId) {
      throw new Error("User ID is required");
    }
    if (!this.lesson) {
      throw new Error("Lesson association is required");
    }
  }
}