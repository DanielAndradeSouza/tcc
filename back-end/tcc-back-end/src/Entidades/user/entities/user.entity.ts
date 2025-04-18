import { Transform } from "class-transformer";
import { ChatMessage } from "src/Entidades/chat_messages/entities/chat_message.entity";
import { UserTable } from "src/Entidades/user_table/entities/user_table.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    email:string;

    @Column()
    password:string;
    
    @Column()
    name:String;
    @Transform(({ value }) => new Date(value)) 
    @Column('text')
    creation_date: Date;

    @Column({default:true})
    active: boolean;

    @Transform(({ value }) => new Date(value)) 
    @Column({ type: 'datetime', nullable: true })
    deactivation_date: Date;
    
    @OneToMany(() => UserTable, (usersTable) => usersTable.user)
    usersTable: UserTable;

    @OneToMany(() => ChatMessage, (chatMessage) => chatMessage.user)
    chatMessages: ChatMessage[];
}
