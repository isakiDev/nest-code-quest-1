import { User } from 'src/auth/entities/user.entity'
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('draws')
export class Draw {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column('text')
    name: string

  @Column('timestamp')
  readonly startDate: Date

  @Column('timestamp')
  readonly finalDate: Date

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP'
  })
  readonly createdAt?: Date

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP'
  })
  readonly updatedAt?: Date

  // ? null because the winner is obtained when he wins
  @ManyToOne(() => User, { nullable: true })
    winningUser?: User

  @ManyToOne(
    () => User,
    (user) => user.id
  )
  readonly user: User

  @BeforeInsert()
  checkFieldsInsert () {
    this.name = this.name.toLocaleLowerCase().trim()
  }
}
