import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from "typeorm";
import { Module } from "./Module";

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  title!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @OneToMany(() => Module, (module) => module.course)
  modules!: Module[];

  @BeforeInsert()
  validate() {
    if (!this.title) {
      throw new Error("Title is required");
    }
    if (this.description && this.description.length > 1000) {
      throw new Error("Description cannot exceed 1000 characters");
    }
  }
}