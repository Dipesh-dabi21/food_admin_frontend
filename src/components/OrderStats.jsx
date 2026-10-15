import { CheckCircle2, ChefHat, PackageCheck, Truck } from "lucide-react";

const statIcons = {
  total: PackageCheck,
  preparing: ChefHat,
  delivery: Truck,
  delivered: CheckCircle2,
};

export default function OrderStats({ stats }) {
  return (
    <section className="stats">
      {stats.map((stat) => {
        const Icon = statIcons[stat.type];

        return (
          <div className="stat" key={stat.label}>
            <div className="stat-top">
              <span>{stat.label}</span>
              <Icon size={18} />
            </div>

            <strong>{stat.value}</strong>
            <small>Live order overview</small>
          </div>
        );
      })}
    </section>
  );
}
