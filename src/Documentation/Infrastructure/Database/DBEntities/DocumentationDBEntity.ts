import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("Documentation")
export default class DocumentationDBEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  link!: string;
}
