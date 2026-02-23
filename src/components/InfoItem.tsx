import type { infoItemProps } from "@/types/infoItemProps";

export default function InfoItem({ icon: Icon, value, label }: infoItemProps) {
	return (
		<div className="flex flex-col items-center">
			<Icon />
			<p>{value}</p>
			<p className="capitalize">{label}</p>
		</div>
	);
}
