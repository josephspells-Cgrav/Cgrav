import type { GuideContent } from "@/lib/content-blocks";
import { content as roofing } from "./roofing";
import { content as painting } from "./painting";
import { content as hvac } from "./hvac";
import { content as kitchenBath } from "./kitchen-bath";
import { content as outdoorLiving } from "./outdoor-living";
import { content as plumbing } from "./plumbing";

export const TRADE_CONTENT: Record<string, GuideContent> = {
  roofing,
  painting,
  hvac,
  "kitchen-bath": kitchenBath,
  "outdoor-living": outdoorLiving,
  plumbing,
};
