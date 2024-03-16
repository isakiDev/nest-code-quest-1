import { IsBoolean } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity('users')
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column('text')
  readonly oAuthId: string

  @Column('text')
  readonly username: string

  @Column('text')
  readonly email: string

  @Column('text')
  readonly avatar: string

  @Column('text', {
    array: true,
    default: ['user']
  })
  readonly roles?: string[]

  @Column('bool', {
    default: true
  })
  readonly joinedToServer?: boolean

  @Column('bool', {
    default: true
  })
  @IsBoolean()
    isActive?: boolean

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP'
  })
  readonly createdAt?: Date

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP'
  })
  readonly updatedAt?: Date
}
