import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bills, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' }) 
  user: User;

  @Column()
  user_id: number; // now this field is available for filtering

  @Column()
  vendor: string;

  @Column('numeric', { precision: 10, scale: 2 })
  amount_due: number;

  @Column()
  due_date: Date;

  @Column()
  email_subject: string;

  @Column({ type: 'text' })
  email_snippet: string;

  @Column({ unique: true })
  email_id: string;

  @Column({ default: false })
  is_paid: boolean;

  @Column({ default: false })
  is_delinquent: boolean;

  @Column({ type: 'varchar', nullable: true })
payment_url: string | null;

  @CreateDateColumn()
  created_at: Date;
}
