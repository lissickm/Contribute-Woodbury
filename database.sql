
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!


--DATABASE NAME "woodbury"

CREATE TABLE "categories" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50)
);

CREATE TABLE "nonprofit" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(100) UNIQUE,
    "password" VARCHAR(250),
    "contact_email" VARCHAR(150),
    "contact_name" VARCHAR(75),
    "contact_phone" VARCHAR(20),
    "address" VARCHAR(150),
    "city" VARCHAR(50),
    "state" VARCHAR(25),
    "zip_code" INT,
    "website" VARCHAR(400),
    "description" VARCHAR,
    "logo" VARCHAR(400),
    "is_approved" BOOLEAN DEFAULT false,
    "category_id" INT REFERENCES "categories",
    "last_confirmed" DATE
);

CREATE TABLE "event" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50),
    "non_profit_id" INT REFERENCES "nonprofit",
    "description" VARCHAR(500),
    "address" VARCHAR(150),
    "city" VARCHAR(50),
    "state" VARCHAR(25),
    "zip_code" INT,
    "start_date" DATE,
    "end_date" DATE,
    "start_time" TIME,
    "end_time" TIME,
    "event_url" VARCHAR(2000)
);

CREATE TABLE "role" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50),
    "description" VARCHAR(450),
    "number_needed" INT,
    "start_time" TIME,
    "end_time" TIME,
    "date" DATE,
    "event_id" INT REFERENCES "event" 
);

CREATE TABLE "volunteer_role" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(80),
    "role_id" INT REFERENCES "role",
    "start_time" TIME,
    "end_time" TIME,
    "comments" VARCHAR(350),
    "email" VARCHAR(150),
    "phone_number" VARCHAR(15),
    "address" VARCHAR(150),
    "city" VARCHAR(50),
    "state" VARCHAR(25),
    "zip_code" INT
);


INSERT INTO "categories" ("name") VALUES ('Community Development'), ('Health'), ('Human Services'), ('Youth');

INSERT INTO "nonprofit" ("name", "password", "contact_email", "contact_name", "contact_phone", "address", "city", "state", "zip_code", "website", "logo", "description", "category_id" )

VALUES('Woodbury Soccer Club','test','messi@gmail.com','Lionel Messi','651-306-7025','129 Castle Drive','Woodbury','MN',55125, 'https://www.woodburysoccer.com/', 'https://images-platform.99static.com/Uzy8ZeQ76PdTIO-x94wE5OjIjvY=/500x500/top/smart/99designs-contests-attachments/9/9431/attachment_9431980', 'The Woodbury Soccer Club decided recently to combine with REV to form a new organization called Salvo. It serves both communities and allows the clubs to share administrative costs.', 4),

('Woodbury Rotary Club','test','fred@gmail.com','Fred Woodbury','651-455-7025','345 Rotary Drive','Woodbury','MN',55125, 'https://woodburymnrotary.org/', 'https://www.saukvalley.com/_internal/cimg!0/q5vuql1mpdkvvshmw0id3encmnbojz0', 'The Woodbury Rotary Club serves all aspects of the community. We meet once a month with speakers and plan ways to help the community.', 1),

('League of Women Voters','test','shiela@gmail.com','Shiela Voter','651-455-7565','845 VoteNow Circle','Woodbury','MN',55125, 'https://www.lwvmn.org/', 'https://bloximages.newyork1.vip.townnews.com/postbulletin.com/content/tncms/assets/v3/editorial/e/a8/ea8342a2-b14d-11e8-b4da-6f7ee00ff98a/5b9287011e818.preview.png?crop=940%2C705%2C0%2C41&resize=840%2C630&order=crop%2Cresize', 'Minnesota granted women the right to vote in presidential elections on March 24, 1919, and later ratified the 19th Amendment on September 8, 1919. The League of Women Voters of Minnesota was organized on October 29, 1919 in meetings called by the Minnesota Woman Suffrage Association. Clara Ueland (pictured) served as LWV Minnesota’s first president. This year, we celebrate a century of civic engagement, and invite you to join us for our five-part series of events!
', 1),

('Woodbury Goat Owners Association','test','lindacampbell@gmail.com','Linda Campbell','651-495-3565','845 Pasture Pass','Woodbury','MN',55125, 'https://americangoatsociety.com/', 'https://bitterrootdairygoatassociation.weebly.com/uploads/9/2/3/6/92364842/1476989579.png', 'The Woodbury Goat Owners Association has a long history of pioneering. It was the first organization to register purebred goats exclusively. It was first to supply two generations of pedigrees on the registration certificate. AGS brought the first national dairy goat show. It was first to provide training for goat judges. It was first to offer classification of dairy goats. Today, WGOA continues to seek new ways to serve dairy goat enthusiasts.
', 2);

INSERT INTO "event" ("name", "description", "address", "city", "zip_code", "start_date", "end_date", "event_url", "non_profit_id", "start_time", "end_time", "state") VALUES ('Apple Fest','Apple Fest is a fall celebration for families at the Jones Orchard. There will be apple picking, bobbing for apples and sack races.','123 Canyon Ridge Road','Woodbury',55125,'10/1/1','10/2/1','https://static.wixstatic.com/media/63d943_517834ca5e0340aeb505d4232e901066~mv2_d_3840_2160_s_2.jpg/v1/fill/w_1600,h_900,al_c,q_90/file.jpg',1, '10:00 AM', '3:00 PM', 'MN'),

('Learn to Square Dance','Re-live your elementary school days by attending our event and breaking out your dancing shoes. Free square dance lessons from local experts','456 Oak Springs Lane','Woodbury',55125,'10/15/1','10/15/1','https://cobbgalleria.com/wp-content/uploads/2019/04/PreComDancers4.jpg',1,'2:00 PM', '8:00 PM', 'MN'),

('Woodbury Soccer Bonanza','Come join the soccer players from Woodbury to show off your skillz. Take part in the soccer shootout challenge and compete against a local goaltender. Learn how to Bend it Like Beckham with your corner kicks. Special appearances by players from the Minnesota United','314 Soccer Blvd.','Woodbury',55125,'10/21/19','10/21/19','http://mwsoccer.com/news_images/org_1852/Image/fall-girls.jpg',1,'1:00 PM', '4:00 PM', 'MN'),

('Harley-It_Up','Join the local riders by bringing your Harley or other ride to Central Park to show off. After a meet and greet, enjoy a ride through the Woodbury backroads and along the St. Croix River. Free Harley Davidson demo rides from 1:00 to 3:00. Bring your helmet!','123 Center Street','Woodbury',55125,'10/21/19','10/21/19','https://cdn2.hubspot.net/hub/4559577/hubfs/062243_ST_19GAP_181261_V1_2_FN.jpg',1,'6:00 PM', '11:00 PM', 'MN'),

('Octoberfest','Celebrate Fall with everyones favorite festival in October. Come try out your favorite bratwurst and sauerkraut. Don\'t forget the ketchup! Enjoy authentic German music and dancing. Don\'t forget to bring the family','279 Prescott St.','Woodbury',55125,'10/25/19','10/25/19','http://stmedia.stimg.co/ctyp-new-ulm-oktoberfest-best-events-minnesota.jpg?w=800',2,'3:00 PM', '9:00 PM', 'MN'),

('Goat Yoga Day','Come join us for a relaxing morning. You don\'t need to bring your own goat. We have you covered. Just bring a yoga mat to share with your goat.','352 Farm Bend Road','Woodbury',55125,'11/08/19','11/08/19','https://static.wixstatic.com/media/355b37_871f939a107c4a4eab928a3ae07ba4ee~mv2_d_2016_1512_s_2.jpg',4,'9:00 AM', '11:00 AM', 'MN');

INSERT INTO "role" ("name", "description", "number_needed", "start_time", "end_time", "date", "event_id")
VALUES ('Ticket Taker','For this position you will be take a ticket from each event participant. You will not need to make change. Tickets are purchased online.',2,'8:45 AM','10:30 AM','11/08/10',6),

('Goat Feeder','For this position you will make sure the goats are comfortable. Goat food is provided. Make sure to wash your hands after your shift!.',2,'8:45 AM','10:30 AM','11/08/10',6),

('Goat Clean-up Specialist','For this position you will make sure the goats are clean as a whistle. A shovel and poop bucket is provided. Again, make sure to wash your hands after your shift!.',3,'9:00 AM','11:30 AM','11/08/10',6),

('Goat Yoga Master','For this position you must be an expert on goat yoga. Plan on teaching a bunch of people who have no clue what downward dog is. You get a free pass to Apple Fest for your trouble. Much thanks ahead of time.',1,'8:30 AM','11:00 AM','11/08/10',6);

INSERT INTO "volunteer_role" ("name", "role_id", "start_time", "end_time", "comments", "email", "phone_number", "address", "city", "zip_code", "state")
VALUES ('Mike Johnson',1,'8:45 AM','10:30 AM','I can\'t wait to get started. I used to have a goat when I was a kid. Thanks for the opportunity to re-live my past.','bigmike@gmail.com',+16514632579,'756 Valley Ridge Road','Woodbury',55125, 'MN'),

('Steve Johnson',2,'8:45 AM','10:30 AM','I need some community service hours. My brother Mike filled me in on the details.','bigmikesbro@gmail.com',+16514632579,'756 Valley Ridge Road','Woodbury',55125, 'MN'),

('Maggie May',4,'9:00 AM','11:00 AM','Goats are the cutest thing ever, but they know how to make a mess. I plan to bring my own scooper.','msmaggiemay@gmail.com',+16518675309,'982 Easy Street','Woodbury',55125, 'MN'),

('Adam Jones',2,'9:00 AM','11:00 AM','What do you wear for goat yoga?','adamjones67@gmail.com',+16512226783,'Crow Circle','Woodbury',55125, 'MN'),

('Peter Parker',3,'9:00 AM','11:00 AM','Can I wear my suit?','spidey@gmail.com',+16511234567,'23 Avenger Blvd.','Woodbury',55125, 'MN'),

('Natasha Romanova',3,'8:45 AM','11:00 AM','I am considered a goat expert, but not necessarily a goat yoga master. I am sure I can figure things out.','blackwidow@gmail.com',+16518675309,'23 Avenger Blvd.','Woodbury',55125, 'MN');


-- for cascade delete
ALTER TABLE "public"."event"
  DROP CONSTRAINT "event_non_profit_id_fkey",
  ADD CONSTRAINT "event_non_profit_id_fkey" FOREIGN KEY ("non_profit_id") REFERENCES "public"."nonprofit"("id") ON DELETE CASCADE;

ALTER TABLE "public"."role"
  DROP CONSTRAINT "role_event_id_fkey",
  ADD CONSTRAINT "role_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE CASCADE;

ALTER TABLE "public"."volunteer_role"
  DROP CONSTRAINT "volunteer_role_role_id_fkey",
  ADD CONSTRAINT "volunteer_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."role"("id") ON DELETE CASCADE;
