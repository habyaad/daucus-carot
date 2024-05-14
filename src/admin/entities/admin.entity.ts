import { User } from 'src/common/entities/user.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Admin extends User {
  @Column({ unique: true })
  email: string;

  @Column({ length: 11, unique: true })
  phoneNumber: string;
}
