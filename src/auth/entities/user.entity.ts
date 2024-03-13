import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('users')
export class User {
  @PrimaryColumn()
  readonly id: string

  @Column('text')
  readonly username: string

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

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP'
  })
  readonly createdAt?: Date

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP'
  })
  readonly updatedAt?: Date
}
