import data from "@/data/institutions.json";
import type { Institution, InstitutionType } from "@/lib/types";

const institutions = data as Institution[];

export function getAllInstitutions(): Institution[] {
  return institutions;
}

export function getInstitutionsByType(type: InstitutionType): Institution[] {
  return institutions.filter((item) => item.type === type);
}

export function getInstitution(
  type: InstitutionType,
  id: string
): Institution | undefined {
  return institutions.find((item) => item.type === type && item.id === id);
}

export function getRelatedInstitutions(
  current: Institution,
  count = 4
): Institution[] {
  return institutions
    .filter((item) => item.type === current.type && item.id !== current.id)
    .slice(0, count);
}
