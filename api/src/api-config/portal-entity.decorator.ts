import { Entity, EntityOptions } from 'typeorm';
import 'dotenv/config';

function createDatabaseEntityDecorator(schema: string) {
  return (name: string, options?: EntityOptions): ClassDecorator => {
    const database = process.env.DB_PORTAL_NAME;
    return Entity({
      name,
      database,
      schema,
      synchronize: false,
      ...options,
    });
  };
}
export const PortalEntity = createDatabaseEntityDecorator('portal_servidor');
export const DboEntity = createDatabaseEntityDecorator('dbo');