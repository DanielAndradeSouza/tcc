import { DataSource } from "typeorm";
import { User } from "../user/entities/user.entity";
import { Table } from "../table/entities/table.entity";
import { UserTable } from "../user_table/entities/user_table.entity";
import { ChatMessage } from "../chat_messages/entities/chat_message.entity";
import { Scene } from "../scene/entities/scene.entity";
import { SceneImage } from "../scene_images/entities/scene_image.entity";

export const appDataSource = new DataSource({
        type: "mysql",   
        host: "localhost",
        port: 3306,  
        username: "root", 
        password: "Poney2507@!", 
        database: "VTT_RPG", 
        entities:[User,Table,UserTable,ChatMessage,Scene,SceneImage],
        synchronize: true, 
        logging: true
})