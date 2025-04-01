import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuid } from 'uuid'

@Entity("products")
export class Product {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  weight: number;

  @CreateDateColumn({
    name: 'createdAt',
    type: 'timestamp',
  })
  createdAt: Date

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
