import { User } from 'src/auth/entities/user.entity'
import { Draw } from 'src/draws/entities'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity('participants')
@Unique(['user', 'draw'])
export class Participant {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP'
  })
  readonly participantDate?: Date

  @ManyToOne(
    () => User,
    (user) => user.id
  )
  readonly user: User

  @ManyToOne(
    () => Draw,
    (draw) => draw.id
  )
  readonly draw: Draw
}
