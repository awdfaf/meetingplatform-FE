import { Route } from "@/routers/types";
import __categoryData from "./jsons/__categoryData.json";
import { TaxonomyType } from "./types";

const MEETING_CATEGORIES: TaxonomyType[] = __categoryData.map((item) => ({
  ...item,
  taxonomy: "category",
  href: item.href as Route,
}));

const MEETING_TAGS: TaxonomyType[] = __categoryData.map((item) => ({
  ...item,
  taxonomy: "tag",
  href: item.href as Route,
}));

export { MEETING_CATEGORIES, MEETING_TAGS };
