import { pgTable, serial } from 'drizzle-orm/pg-core';

export const bids = pgTable('bids', {
  id: serial('id').primaryKey(),
});
