import { Home, Building2, Sofa, MapPin, ShieldCheck, PackageCheck, BadgeCheck, Package } from 'lucide-react';

const MAP = { Home, Building2, Sofa, MapPin, ShieldCheck, PackageCheck, BadgeCheck, Package };

export default function Icon({ name, ...props }) {
  const C = MAP[name] || Package;
  return <C aria-hidden="true" {...props} />;
}
