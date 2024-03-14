import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('draws')
export class Draw {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column('text', {
    unique: true
  })
    name: string

  @Column('timestamp')
  readonly startDate: Date

  @Column('timestamp')
  readonly finalDate: Date

  // userId (default null)

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP'
  })
  readonly createdAt?: Date

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP'
  })
  readonly updatedAt?: Date

  @BeforeInsert()
  checkFieldsInsert () {
    this.name = this.name.toLocaleLowerCase().trim()
  }
}
