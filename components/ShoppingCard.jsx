"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import shopItems from "@/data/shopItems";

export function ThreeDCardDemo() {
  return (
    <CardContainer className="inter-var">
      {shopItems.map((item) => (
        <CardBody
          key={item.id}
          className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-80 h-auto rounded-xl p-6 border" // increased width and padding
        >
          <CardItem
            translateZ="50"
            className="text-lg font-bold text-neutral-600 dark:text-white"
          >
            {item.title}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-xs mt-2 dark:text-neutral-300"
          >
            {item.description}
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-2">
            {/* mt-2 for a bit more space */}
            <img
              src={item.imageUrl}
              height="400"
              width="400"
              className="h-40 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex justify-between items-center mt-4">
            {/* mt-4 for more space */}
            <CardItem
              translateZ={20}
              as="a"
              href="https://twitter.com/mannupaaji"
              target="__blank"
              className="px-4 py-2 rounded-xl text-sm font-normal dark:text-white"
            >
              Try now →
            </CardItem>
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-sm font-bold"
            >
              Sign up
            </CardItem>
          </div>
        </CardBody>
      ))}
    </CardContainer>
  );
}
