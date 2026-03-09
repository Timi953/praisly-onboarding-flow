export interface Service {
  name: string;
  duration: number;
  price: number;
  id?: number;
}

export interface BusinessType {
  id: string;
  label: string;
  icon: string;
  services: Service[];
}

export interface DaySchedule {
  on: boolean;
  open: string;
  close: string;
}

export type WeekSchedule = Record<string, DaySchedule>;

export interface BusinessData {
  name: string;
  type: string;
  desc: string;
}

export const businessTypes: BusinessType[] = [
  {
    id: "salon",
    label: "Hair Salon",
    icon: "Scissors",
    services: [
      { name: "Women's Haircut", duration: 45, price: 35 },
      { name: "Men's Haircut", duration: 30, price: 20 },
      { name: "Blow Dry", duration: 30, price: 25 },
      { name: "Color & Highlights", duration: 90, price: 80 },
      { name: "Hair Treatment", duration: 60, price: 45 },
    ],
  },
  {
    id: "hotel",
    label: "Hotel",
    icon: "Hotel",
    services: [
      { name: "Standard Room", duration: 1440, price: 120 },
      { name: "Deluxe Room", duration: 1440, price: 180 },
      { name: "Suite", duration: 1440, price: 280 },
    ],
  },
  {
    id: "clinic",
    label: "Clinic",
    icon: "Stethoscope",
    services: [
      { name: "General Consultation", duration: 30, price: 50 },
      { name: "Follow-up Visit", duration: 15, price: 30 },
      { name: "Lab Work", duration: 20, price: 40 },
    ],
  },
  {
    id: "gym",
    label: "Fitness",
    icon: "Dumbbell",
    services: [
      { name: "Personal Training", duration: 60, price: 60 },
      { name: "Group Class", duration: 45, price: 20 },
      { name: "Yoga Session", duration: 60, price: 25 },
    ],
  },
  {
    id: "restaurant",
    label: "Restaurant",
    icon: "UtensilsCrossed",
    services: [
      { name: "Table for 2", duration: 90, price: 0 },
      { name: "Table for 4", duration: 90, price: 0 },
      { name: "Private Dining", duration: 120, price: 50 },
    ],
  },
  {
    id: "other",
    label: "Other",
    icon: "Briefcase",
    services: [
      { name: "Consultation", duration: 30, price: 50 },
      { name: "Standard Service", duration: 60, price: 75 },
    ],
  },
];

export const defaultWeek: WeekSchedule = {
  Mon: { on: true, open: "09:00", close: "18:00" },
  Tue: { on: true, open: "09:00", close: "18:00" },
  Wed: { on: true, open: "09:00", close: "18:00" },
  Thu: { on: true, open: "09:00", close: "18:00" },
  Fri: { on: true, open: "09:00", close: "17:00" },
  Sat: { on: false, open: "10:00", close: "14:00" },
  Sun: { on: false, open: "", close: "" },
};

export const STEP_LABELS = ["Business", "Services", "Hours", "Review"];
