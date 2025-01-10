import { json, pgTable, real, text, uuid } from "drizzle-orm/pg-core";

export const windowTable = pgTable('windows', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull(),
  curatainRailWidth: real('curatain_rail_width').notNull(),
  height: real('height').notNull(),
  width: real('width').notNull()
})

export const roomTable = pgTable('rooms', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull(),
  area: real('area').notNull(),
  object: json('object').notNull(),
  maxHeight: real('max_height').notNull(),
  minHeight: real('min_height').notNull()
})