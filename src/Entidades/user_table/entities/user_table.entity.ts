import { Table } from "src/Entidades/table/entities/table.entity";
import { User } from "src/Entidades/user/entities/user.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn,  } from "typeorm";

export class UserTable {
        @PrimaryGeneratedColumn()
        id: number;
        
        @ManyToOne(() => User, (user) => user.usersTable)
        user:User;
    
        @ManyToOne(() => Table, (table) => table.usersTable)
        table:Table;
    
        @Column()
        role:string;
    
        @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
        join_date: Date;
}
