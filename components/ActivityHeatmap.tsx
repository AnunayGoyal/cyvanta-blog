"use client";

import React, { useEffect, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { Tooltip } from "react-tooltip";

// Generate mock data for the last 365 days
const generateMockData = () => {
    const data = [];
    const now = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setDate(now.getDate() - 365);
  
    for (let d = oneYearAgo; d <= now; d.setDate(d.getDate() + 1)) {
      // Random activity level: 0 (no activity) to 4 (high activity)
      // Bias towards 0 to make it realistic
      const rand = Math.random();
      let level = 0;
      let count = 0;
      
      if (rand > 0.9) {
          level = 4;
          count = Math.floor(Math.random() * 10) + 10;
      } else if (rand > 0.8) {
          level = 3;
          count = Math.floor(Math.random() * 5) + 5;
      } else if (rand > 0.6) {
          level = 2;
          count = Math.floor(Math.random() * 3) + 2;
      } else if (rand > 0.4) {
          level = 1;
          count = 1;
      }
  
      data.push({
        date: d.toISOString().split("T")[0],
        count: count,
        level: level,
      });
    }
    return data;
  };

export default function ActivityHeatmap() {
  const [data, setData] = useState<Array<{ date: string; count: number; level: number }>>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setData(generateMockData());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl overflow-x-auto pb-4 custom-scrollbar">
          <ActivityCalendar
            data={data}
            theme={{
                light: ['#f0f0f0', '#c4edde', '#7ac7c4', '#f73859', '#384259'],
                dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'], // GitHub dark green theme
            }}
            colorScheme="dark"
            blockSize={12}
            blockMargin={4}
            fontSize={12}
            showWeekdayLabels
            renderBlock={(block: React.ReactElement, activity: { date: string; count: number; level: number }) => (
                <div
                    data-tooltip-id="react-tooltip"
                    data-tooltip-content={`${activity.count} activities on ${activity.date}`}
                    data-tooltip-place="top"
                >
                    {block}
                </div>
            )}
          />
          <Tooltip id="react-tooltip" className="z-50 bg-background border border-border text-foreground px-2 py-1 text-xs rounded shadow-md" />
      </div>
      
      <div className="mt-4 flex items-center justify-end w-full max-w-4xl text-xs text-muted-foreground gap-1">
          <span>Less</span>
          <div className="w-3 h-3 bg-[#161b22] rounded-sm"></div>
          <div className="w-3 h-3 bg-[#0e4429] rounded-sm"></div>
          <div className="w-3 h-3 bg-[#006d32] rounded-sm"></div>
          <div className="w-3 h-3 bg-[#26a641] rounded-sm"></div>
          <div className="w-3 h-3 bg-[#39d353] rounded-sm"></div>
          <span>More</span>
      </div>
    </div>
  );
}
