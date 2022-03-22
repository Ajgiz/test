import sequelize from '../db'
import { IContact } from '../types/contact';
import { Model, DataTypes } from '@sequelize/core';

interface contactAttributes {
    id: number;
    username: string;
    phone: string
}

class Contact extends Model {
    declare id: number;
    declare username: string;
    declare phone: string
}

Contact.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(128),
        allowNull: true,
        unique: true
    },
}, {
    tableName: 'contact',
    sequelize: sequelize
})


export default Contact;
