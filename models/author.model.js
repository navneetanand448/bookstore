const { pgTable, uuid, varchar } = require("drizzle-orm/pg-core");

const authorTable = pgTable("authors", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: varchar("first_name", { length: 55 }).notNull(),
  lastName: varchar("last_name", { length: 55 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
});

module.exports = authorTable;
