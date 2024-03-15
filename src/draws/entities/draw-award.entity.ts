import { Draw } from 'src/draws/entities/draw.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Award } from '../../awards/entities/award.entity'

@Entity('draws_awards')
export class DrawAward {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP'
  })
  readonly createdAt?: Date

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP'
  })
  readonly updatedAt?: Date

  @ManyToOne(
    () => Award,
    (award) => award.id
  )
  readonly award: Award

  @ManyToOne(
    () => Draw,
    (draw) => draw.id
  )
  readonly draw: Draw
}
