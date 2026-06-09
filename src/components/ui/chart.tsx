// // components/ui/chart.tsx
// 'use client';

// import * as React from "react";
// import * as RechartsPrimitive from "recharts";
// import { cn } from "@/lib/utils";

// // Themes
// const THEMES = { light: "", dark: ".dark" } as const;

// // Chart Config Type
// export type ChartConfig = {
//   [k: string]: {
//     label?: React.ReactNode;
//     icon?: React.ComponentType<{ className?: string }>;
//   } & (
//     | { color?: string; theme?: never }
//     | { color?: never; theme: Record<keyof typeof THEMES, string> }
//   );
// };

// // Context
// type ChartContextProps = {
//   config: ChartConfig;
// };

// const ChartContext = React.createContext<ChartContextProps | null>(null);

// function useChart() {
//   const context = React.useContext(ChartContext);
//   if (!context) {
//     throw new Error("useChart must be used within a <ChartContainer />");
//   }
//   return context;
// }

// // Chart Container
// type ChartContainerProps = React.ComponentProps<"div"> & {
//   config: ChartConfig;
//   children: React.ReactNode;
// };

// const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
//   ({ id, className, children, config, ...props }, ref) => {
//     const uniqueId = React.useId();
//     const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

//     return (
//       <ChartContext.Provider value={{ config }}>
//         <div
//           ref={ref}
//           data-chart={chartId}
//           className={cn(
//             "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
//             className
//           )}
//           {...props}
//         >
//           <ChartStyle id={chartId} config={config} />
//           <RechartsPrimitive.ResponsiveContainer>
//             {children}
//           </RechartsPrimitive.ResponsiveContainer>
//         </div>
//       </ChartContext.Provider>
//     );
//   }
// );
// ChartContainer.displayName = "ChartContainer";

// // Chart Style
// const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
//   const colorConfig = Object.entries(config).filter(
//     ([_, config]) => config.theme || config.color
//   );

//   if (!colorConfig.length) return null;

//   return (
//     <style
//       dangerouslySetInnerHTML={{
//         __html: Object.entries(THEMES)
//           .map(
//             ([theme, suffix]) => `
// ${suffix} [data-chart=${id}] {
// ${colorConfig
//   .map(([key, itemConfig]) => {
//     const color =
//       itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
//       itemConfig.color;
//     return color ? `  --color-${key}: ${color};` : null;
//   })
//   .filter(Boolean)
//   .join("\n")}
// }
// `
//           )
//           .join("\n"),
//       }}
//     />
//   );
// };

// // Tooltip
// const ChartTooltip = RechartsPrimitive.Tooltip;

// // Tooltip Content
// type ChartTooltipContentProps = React.ComponentPropsWithoutRef<
//   typeof RechartsPrimitive.Tooltip
// > & {
//   hideLabel?: boolean;
//   hideIndicator?: boolean;
//   indicator?: "line" | "dot" | "dashed";
//   nameKey?: string;
//   labelKey?: string;
// };

// const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipContentProps>(
//   (
//     {
//       active,
//       payload,
//       label,
//       className,
//       indicator = "dot",
//       hideLabel = false,
//       hideIndicator = false,
//       labelFormatter,
//       labelClassName,
//       formatter,
//       color,
//       nameKey,
//       labelKey,
//     },
//     ref
//   ) => {
//     const { config } = useChart();

//     const tooltipLabel = React.useMemo(() => {
//       if (hideLabel || !payload?.length) return null;

//       const [item] = payload;
//       const key = `${labelKey || (item.dataKey as string) || item.name || "value"}`;
//       const itemConfig = getPayloadConfigFromPayload(config, item, key);
//       const value =
//         !labelKey && typeof label === "string"
//           ? config[label as keyof typeof config]?.label || label
//           : itemConfig?.label;

//       if (labelFormatter && value !== undefined) {
//         return (
//           <div className={cn("font-medium", labelClassName)}>
//             {labelFormatter(value, payload)}
//           </div>
//         );
//       }

//       if (!value) return null;

//       return <div className={cn("font-medium", labelClassName)}>{value}</div>;
//     }, [
//       label,
//       labelFormatter,
//       payload,
//       hideLabel,
//       labelClassName,
//       config,
//       labelKey,
//     ]);

//     if (!active || !payload?.length) return null;

//     const nestLabel = payload.length === 1 && indicator !== "dot";

//     return (
//       <div
//         ref={ref}
//         className={cn(
//           "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
//           className
//         )}
//       >
//         {!nestLabel ? tooltipLabel : null}
//         <div className="grid gap-1.5">
//           {payload.map((entry, index) => {
//             const key = `${nameKey || entry.name || (entry.dataKey as string) || "value"}`;
//             const itemConfig = getPayloadConfigFromPayload(config, entry, key);
//             const indicatorColor = color || entry.color || (entry.payload?.fill as string);

//             return (
//               <div
//                 key={index}
//                 className={cn(
//                   "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
//                   indicator === "dot" && "items-center"
//                 )}
//               >
//                 {formatter && entry.value !== undefined && entry.name ? (
//                   <>{formatter(entry.value, entry.name, entry, index, entry.payload)}</>
//                 ) : (
//                   <>
//                     {itemConfig?.icon ? (
//                       <itemConfig.icon className="h-2.5 w-2.5" />
//                     ) : (
//                       !hideIndicator && (
//                         <div
//                           className={cn(
//                             "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
//                             {
//                               "h-2.5 w-2.5": indicator === "dot",
//                               "w-1": indicator === "line",
//                               "w-0 border-[1.5px] border-dashed bg-transparent":
//                                 indicator === "dashed",
//                               "my-0.5": nestLabel && indicator === "dashed",
//                             }
//                           )}
//                           style={
//                             {
//                               "--color-bg": indicatorColor,
//                               "--color-border": indicatorColor,
//                             } as React.CSSProperties
//                           }
//                         />
//                       )
//                     )}
//                     <div
//                       className={cn(
//                         "flex flex-1 justify-between leading-none",
//                         nestLabel ? "items-end" : "items-center"
//                       )}
//                     >
//                       <div className="grid gap-1.5">
//                         {nestLabel ? tooltipLabel : null}
//                         <span className="text-muted-foreground">
//                           {itemConfig?.label || entry.name}
//                         </span>
//                       </div>
//                       {entry.value != null && (
//                         <span className="font-mono font-medium tabular-nums text-foreground">
//                           {entry.value.toLocaleString()}
//                         </span>
//                       )}
//                     </div>
//                   </>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   }
// );
// ChartTooltipContent.displayName = "ChartTooltipContent";

// // Legend
// const ChartLegend = RechartsPrimitive.Legend;

// type ChartLegendContentProps = React.ComponentProps<"div"> & {
//   payload?: Array<{ value: string; color: string; dataKey?: string }>;
//   verticalAlign?: "top" | "bottom";
//   hideIcon?: boolean;
//   nameKey?: string;
// };

// const ChartLegendContent = React.forwardRef<HTMLDivElement, ChartLegendContentProps>(
//   ({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
//     const { config } = useChart();

//     if (!payload?.length) return null;

//     return (
//       <div
//         ref={ref}
//         className={cn(
//           "flex items-center justify-center gap-4",
//           verticalAlign === "top" ? "pb-3" : "pt-3",
//           className
//         )}
//       >
//         {payload.map((item, index) => {
//           const key = `${nameKey || item.dataKey || item.value}`;
//           const itemConfig = getPayloadConfigFromPayload(config, item, key);

//           return (
//             <div
//               key={index}
//               className={cn(
//                 "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
//               )}
//             >
//               {itemConfig?.icon && !hideIcon ? (
//                 <itemConfig.icon className="h-3 w-3" />
//               ) : (
//                 <div
//                   className="h-2 w-2 shrink-0 rounded-[2px]"
//                   style={{ backgroundColor: item.color }}
//                 />
//               )}
//               <span>{itemConfig?.label || item.value}</span>
//             </div>
//           );
//         })}
//       </div>
//     );
//   }
// );
// ChartLegendContent.displayName = "ChartLegendContent";

// // Helper Function
// function getPayloadConfigFromPayload(
//   config: ChartConfig,
//   payload: unknown,
//   key: string
// ): ChartConfig[string] | undefined {
//   if (typeof payload !== "object" || payload === null) return undefined;

//   const payloadObj = payload as Record<string, unknown>;
//   const payloadPayload =
//     "payload" in payloadObj &&
//     typeof payloadObj.payload === "object" &&
//     payloadObj.payload !== null
//       ? (payloadObj.payload as Record<string, unknown>)
//       : undefined;

//   let configLabelKey: string = key;

//   if (key in payloadObj && typeof payloadObj[key] === "string") {
//     configLabelKey = payloadObj[key] as string;
//   } else if (
//     payloadPayload &&
//     key in payloadPayload &&
//     typeof payloadPayload[key] === "string"
//   ) {
//     configLabelKey = payloadPayload[key] as string;
//   }

//   return config[configLabelKey] ?? config[key];
// }

// // Export
// export {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
//   ChartLegend,
//   ChartLegendContent,
//   ChartStyle,
//   getPayloadConfigFromPayload,
// };
