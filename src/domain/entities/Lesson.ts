import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert, OneToMany } from "typeorm";
import { Module } from "./Module";
import { Completion } from "./Completion";

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  title!: string;

  @ManyToOne(() => Module, (module) => module.lessons)
  module!: Module;

  @OneToMany(() => Completion, (completion) => completion.lesson)
  completions!: Completion[];

  @BeforeInsert()
  validate() {
    if (!this.title) {
      throw new Error("Title is required");
    }
    if (!this.module) {
      throw new Error("Module association is required");
    }
  }
}