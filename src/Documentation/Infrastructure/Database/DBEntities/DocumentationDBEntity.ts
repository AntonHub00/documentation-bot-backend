import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Documentation")
export default class DocumentationDBEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  link!: string;
}
