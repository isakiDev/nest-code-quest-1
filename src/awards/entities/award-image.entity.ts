import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Award } from './'

@Entity('awards_images')
export class AwardImage {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column('text')
  readonly url: string

  @ManyToOne(
    () => Award,
    (award) => award.images
    // { onDelete: 'CASCADE' } activate to use delete endpoint
  )
  readonly award: Award
}
