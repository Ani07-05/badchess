CREATE TABLE "brilliant_moves" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"fen" text DEFAULT '' NOT NULL,
	"move" text DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "levels" (
	"level" serial PRIMARY KEY NOT NULL,
	"name" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"lower_bound_chess_rating" integer NOT NULL,
	"upper_bound_chess_rating" integer NOT NULL,
	"lower_bound_puzzle_rating" integer NOT NULL,
	"upper_bound_puzzle_rating" integer NOT NULL,
	"number_of_puzzles" integer NOT NULL,
	"number_of_brilliant_moves" integer NOT NULL,
	"number_of_good_moves" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "puzzles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text DEFAULT '' NOT NULL,
	"fen" text DEFAULT '' NOT NULL,
	"player_moves" text[] DEFAULT '{}'::text[] NOT NULL,
	"computer_moves" text[] DEFAULT '{}'::text[] NOT NULL,
	"puzzle_rating" integer NOT NULL,
	"tactic" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tactics" (
	"tactic" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" text PRIMARY KEY NOT NULL,
	"init_rating" integer DEFAULT 1000 NOT NULL,
	"puzzle_rating" integer DEFAULT 1000 NOT NULL,
	"puzzles_solved" text[] DEFAULT '{}'::text[] NOT NULL,
	"email" text NOT NULL,
	"level" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"leveled_up_at" timestamp DEFAULT now() NOT NULL,
	"last_puzzle_at" timestamp DEFAULT now() NOT NULL,
	"last_brilliant_move_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "brilliant_moves" ADD CONSTRAINT "brilliant_moves_userId_users_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "puzzles" ADD CONSTRAINT "puzzles_tactic_tactics_tactic_fk" FOREIGN KEY ("tactic") REFERENCES "public"."tactics"("tactic") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_level_levels_level_fk" FOREIGN KEY ("level") REFERENCES "public"."levels"("level") ON DELETE no action ON UPDATE no action;