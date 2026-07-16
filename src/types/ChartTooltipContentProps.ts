import type { TooltipProps } from "recharts";

type ChartValueType = string | number | (string | number)[];

type ChartNameType = string | number;

export type ChartTooltipContentProps = {
	active?: boolean;
	payload?: TooltipProps<ChartValueType, ChartNameType>["payload"];
	unit: string;
};
