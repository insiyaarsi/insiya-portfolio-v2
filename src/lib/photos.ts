import p1 from "@/assets/photos/photo1.jpg";
import p2 from "@/assets/photos/photo-2.jpg";
import p3 from "@/assets/photos/photo-3.jpg";
import p4 from "@/assets/photos/photo-4.jpg";
import p5 from "@/assets/photos/photo-5.jpg";
import p6 from "@/assets/photos/photo-6.jpg";
import p7 from "@/assets/photos/photo-7.jpg";
import p8 from "@/assets/photos/photo-8.jpg";
import p9 from "@/assets/photos/photo-9.jpg";
import p10 from "@/assets/photos/photo-10.jpg";
import p11 from "@/assets/photos/photo-11.jpg";
import p12 from "@/assets/photos/photo-12.jpg";

export type Photo = {
  src: string;
  alt: string;
  caption?: string;
  orientation: "portrait" | "landscape";
};

export const photos: Photo[] = [
  {
    src: p1,
    alt: "Sunset at the beach with silhouettes wading into the water",
    caption: "grand bend · lake huron",
    orientation: "landscape",
  },
  {
    src: p10,
    alt: "Sun setting over tidal rocks and pools",
    caption: "bandstand · low tide",
    orientation: "portrait",
  },
  {
    src: p12,
    alt: "Sunset over Marine Drive skyline with parked cars in foreground",
    caption: "kilachand chowk · mumbai",
    orientation: "portrait",
  },
  {
    src: p2,
    alt: "Creek flowing over rocks in a forest",
    caption: "creekside walk",
    orientation: "portrait",
  },
  {
    src: p11,
    alt: "Sunset over the sea from a rocky shore",
    caption: "rocks & runoff",
    orientation: "landscape",
  },
  {
    src: p9,
    alt: "Montreal skyline seen from Mount Royal",
    caption: "mount royal lookout",
    orientation: "portrait",
  },
  {
    src: p4,
    alt: "River reflecting trees and clouds",
    caption: "still water, loud trees",
    orientation: "portrait",
  },
  {
    src: p6,
    alt: "Lone tree by a calm lake at dusk",
    caption: "the willow at the lake",
    orientation: "portrait",
  },
  {
    src: p3,
    alt: "Golden hour clouds through a car window",
    caption: "shotgun seat sky",
    orientation: "landscape",
  },
  {
    src: p7,
    alt: "Sun setting through trees near a marina",
    caption: "harbourfront · golden hour",
    orientation: "portrait",
  },
  {
    src: p5,
    alt: "Hydrangeas in a wooden planter outside a café window",
    caption: "hydrangeas, holding on",
    orientation: "portrait",
  },
  {
    src: p8,
    alt: "Pink dusk sky over a treeline, motion-blurred",
    caption: "pink hour, in motion",
    orientation: "portrait",
  },
];
