import { Entity, EntityOptions } from 'typeorm';
import 'dotenv/config';

function createDatabaseEntityDecorator() {
  return (name: string, options?: EntityOptions): ClassDecorator => {
    const database = process.env.DB_PORTAL_NAME;
    return Entity({
      name,
      database,
      schema: 'auth',
      synchronize: false,
      ...options,
    });
  };
}
export const PortalEntity = createDatabaseEntityDecorator();