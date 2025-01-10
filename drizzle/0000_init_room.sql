CREATE TABLE "rooms" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"area" real NOT NULL,
	"object" json NOT NULL,
	"max_height" real NOT NULL,
	"min_height" real NOT NULL
);
--> statement-breakpoint
CREATE TABLE "windows" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"curatain_rail_width" real NOT NULL,
	"height" real NOT NULL,
	"width" real NOT NULL
);
