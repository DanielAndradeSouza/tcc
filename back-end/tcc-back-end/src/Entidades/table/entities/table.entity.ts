import { Transform } from "class-transformer";
import { ChatMessage } from "src/Entidades/chat_messages/entities/chat_message.entity";
import { Scene } from "src/Entidades/scene/entities/scene.entity";
import { UserTable } from "src/Entidades/user_table/entities/user_table.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("table")
export class Table {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:false})
    table_name: string;

    @Column({nullable:true})
    description: string;

    @Transform(({ value }) => new Date(value)) 
    @Column('text')
    creation_date: Date;
    @Column({default:true})
    active:boolean;

    @OneToMany(()=> UserTable,(usersTable) => usersTable.table)
    usersTable: UserTable;
    @OneToMany(() => Scene, (scene) => scene.table)
    scenes: Scene[];

    @OneToMany(() => ChatMessage, (chatMessage) => chatMessage.table)
    chatMessages: ChatMessage[];
}
