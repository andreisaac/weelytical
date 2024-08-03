-- CreateTable
CREATE TABLE "project" (
    "id" SERIAL NOT NULL,
    "project_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR DEFAULT '',
    "domain" VARCHAR DEFAULT '',
    "members" JSONB,
    "owner" UUID DEFAULT auth.uid(),
    "type" VARCHAR DEFAULT '',
    "valid" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "browsers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "browsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operating_systems" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "operating_systems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_views" (
    "id" SERIAL NOT NULL,
    "page" TEXT NOT NULL,
    "referrer" TEXT,
    "country_id" INTEGER,
    "os_id" INTEGER,
    "browser_id" INTEGER,
    "view_time" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "visitor_id" INTEGER,
    "project_id" UUID,

    CONSTRAINT "page_views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visitors" (
    "id" SERIAL NOT NULL,
    "visitor_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visitors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "project_project_id_key" ON "project"("project_id");

-- CreateIndex
CREATE UNIQUE INDEX "project_domain_key" ON "project"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "browsers_name_key" ON "browsers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "countries_name_key" ON "countries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "operating_systems_name_key" ON "operating_systems"("name");

-- CreateIndex
CREATE UNIQUE INDEX "visitors_visitor_id_key" ON "visitors"("visitor_id");

-- AddForeignKey
ALTER TABLE "page_views" ADD CONSTRAINT "fk_project_id" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "page_views" ADD CONSTRAINT "fk_browser_id" FOREIGN KEY ("browser_id") REFERENCES "browsers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "page_views" ADD CONSTRAINT "fk_country_id" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "page_views" ADD CONSTRAINT "fk_os_id" FOREIGN KEY ("os_id") REFERENCES "operating_systems"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "page_views" ADD CONSTRAINT "fk_visitor_id" FOREIGN KEY ("visitor_id") REFERENCES "visitors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
