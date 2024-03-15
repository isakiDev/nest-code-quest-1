import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { AwardImage } from './'
import { User } from 'src/auth/entities/user.entity'

@Entity('awards')
export class Award {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column('text')
    name: string

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP'
  })
  readonly createdAt?: Date

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP'
  })
  readonly updatedAt?: Date

  @ManyToOne(
    () => User,
    (user) => user.id
  )
    user: User

  @OneToMany(
    () => AwardImage,
    (awardImage) => awardImage.award,
    { cascade: true, eager: true }

  )
    images?: AwardImage[]

  @BeforeInsert()
  checkFieldsInsert () {
    this.name = this.name.toLocaleLowerCase().trim()
  }
}
