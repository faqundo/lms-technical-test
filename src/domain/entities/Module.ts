import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BeforeInsert } from "typeorm";
import { Course } from "./Course";
import { Lesson } from "./Lesson";

@Entity()
export class Module {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  title!: string;

  @ManyToOne(() => Course, (course) => course.modules)
  course!: Course;

  @OneToMany(() => Lesson, (lesson) => lesson.module)
  lessons!: Lesson[];

  @BeforeInsert()
  validate() {
    if (!this.title) {
      throw new Error("Title is required");
    }
    if (!this.course) {
      throw new Error("Course association is required");
    }
  }
}