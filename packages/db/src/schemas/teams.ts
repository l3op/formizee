import {
  text,
  timestamp,
  uniqueIndex,
  pgEnum,
  pgTable
} from 'drizzle-orm/pg-core';
import {newId} from '@formizee/id';
import {sql} from 'drizzle-orm';
import {users} from './users';

export const billingPlans = pgEnum('billing_plans', [
  'hobby',
  'professional',
  'teams',
  'custom'
]);

export const teams = pgTable(
  'teams',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => newId('team')),

    name: text('name').notNull().unique(),

    plan: billingPlans('plan').notNull().default('hobby'),

    availableEmails: text('available_emails')
      .array()
      .notNull()
      .default(sql`ARRAY[]::text[]`),

    createdBy: text('created_by')
      .notNull()
      .references(() => users.id, {onDelete: 'cascade'}),

    createdAt: timestamp('created_at').notNull().defaultNow(),

    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date())
  },
  table => {
    return {
      nameIndex: uniqueIndex('name_index').on(table.name)
    };
  }
);
