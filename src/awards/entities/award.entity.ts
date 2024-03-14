import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { AwardImage } from './'

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
