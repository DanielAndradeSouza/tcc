import { Table } from "src/Entidades/table/entities/table.entity";
import { User } from "src/Entidades/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity("chat_message")
export class ChatMessage {
      @PrimaryGeneratedColumn()
      id_message: number;
    
      @ManyToOne(() => Table, (table) => table.chatMessages, { onDelete: 'CASCADE' })
      table: Table;
    
      @ManyToOne(() => User, (user) => user.chatMessages, { onDelete: 'CASCADE' })
      user: User;
    
      @Column()
      message: string;
}
