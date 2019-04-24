interface EdamanResult {
  q: string;
  from: number;
  to: number;
  params: Params;
  more: boolean;
  count: number;
  hits: HitsItem[];
}
interface Params {
  sane: any[];
  q: string[];
  app_key: string[];
  app_id: string[];
}
interface HitsItem {
  recipe: Recipe;
  bookmarked: boolean;
  bought: boolean;
}
interface Recipe {
  uri: string;
  label: string;
  image: string;
  source: string;
  url: string;
  shareAs: string;
  yield: number;
  dietLabels: string[];
  healthLabels: string[];
  cautions: string[];
  ingredientLines: string[];
  ingredients: IngredientsItem[];
  calories: number;
  totalWeight: number;
  totalTime: number;
  totalNutrients: TotalNutrients;
  totalDaily: TotalDaily;
  digest: DigestItem[];
}
interface IngredientsItem {
  text: string;
  weight: number;
}
interface TotalNutrients {
  ENERC_KCAL: ENERC_KCAL;
  FAT: FAT;
  FASAT: FASAT;
  FATRN: FATRN;
  FAMS: FAMS;
  FAPU: FAPU;
  CHOCDF: CHOCDF;
  FIBTG: FIBTG;
  SUGAR: SUGAR;
  PROCNT: PROCNT;
  CHOLE: CHOLE;
  NA: NA;
  CA: CA;
  MG: MG;
  K: K;
  FE: FE;
  ZN: ZN;
  P: P;
  VITA_RAE: VITA_RAE;
  VITC: VITC;
  THIA: THIA;
  RIBF: RIBF;
  NIA: NIA;
  VITB6A: VITB6A;
  FOLDFE: FOLDFE;
  FOLFD: FOLFD;
  VITB12: VITB12;
  VITD: VITD;
  TOCPHA: TOCPHA;
  VITK1: VITK1;
  FOLAC?: FOLAC;
}
interface ENERC_KCAL {
  label: string;
  quantity: number;
  unit: string;
}
interface FAT {
  label: string;
  quantity: number;
  unit: string;
}
interface FASAT {
  label: string;
  quantity: number;
  unit: string;
}
interface FATRN {
  label: string;
  quantity: number;
  unit: string;
}
interface FAMS {
  label: string;
  quantity: number;
  unit: string;
}
interface FAPU {
  label: string;
  quantity: number;
  unit: string;
}
interface CHOCDF {
  label: string;
  quantity: number;
  unit: string;
}
interface FIBTG {
  label: string;
  quantity: number;
  unit: string;
}
interface SUGAR {
  label: string;
  quantity: number;
  unit: string;
}
interface PROCNT {
  label: string;
  quantity: number;
  unit: string;
}
interface CHOLE {
  label: string;
  quantity: number;
  unit: string;
}
interface NA {
  label: string;
  quantity: number;
  unit: string;
}
interface CA {
  label: string;
  quantity: number;
  unit: string;
}
interface MG {
  label: string;
  quantity: number;
  unit: string;
}
interface K {
  label: string;
  quantity: number;
  unit: string;
}
interface FE {
  label: string;
  quantity: number;
  unit: string;
}
interface ZN {
  label: string;
  quantity: number;
  unit: string;
}
interface P {
  label: string;
  quantity: number;
  unit: string;
}
interface VITA_RAE {
  label: string;
  quantity: number;
  unit: string;
}
interface VITC {
  label: string;
  quantity: number;
  unit: string;
}
interface THIA {
  label: string;
  quantity: number;
  unit: string;
}
interface RIBF {
  label: string;
  quantity: number;
  unit: string;
}
interface NIA {
  label: string;
  quantity: number;
  unit: string;
}
interface VITB6A {
  label: string;
  quantity: number;
  unit: string;
}
interface FOLDFE {
  label: string;
  quantity: number;
  unit: string;
}
interface FOLFD {
  label: string;
  quantity: number;
  unit: string;
}
interface VITB12 {
  label: string;
  quantity: number;
  unit: string;
}
interface VITD {
  label: string;
  quantity: number;
  unit: string;
}
interface TOCPHA {
  label: string;
  quantity: number;
  unit: string;
}
interface VITK1 {
  label: string;
  quantity: number;
  unit: string;
}
interface TotalDaily {
  ENERC_KCAL: ENERC_KCAL;
  FAT: FAT;
  FASAT: FASAT;
  CHOCDF: CHOCDF;
  FIBTG: FIBTG;
  PROCNT: PROCNT;
  CHOLE: CHOLE;
  NA: NA;
  CA: CA;
  MG: MG;
  K: K;
  FE: FE;
  ZN: ZN;
  P: P;
  VITA_RAE: VITA_RAE;
  VITC: VITC;
  THIA: THIA;
  RIBF: RIBF;
  NIA: NIA;
  VITB6A: VITB6A;
  FOLDFE: FOLDFE;
  VITB12: VITB12;
  VITD: VITD;
  TOCPHA: TOCPHA;
  VITK1: VITK1;
}
interface DigestItem {
  label: string;
  tag: string;
  schemaOrgTag: string | null;
  total: number;
  hasRDI: boolean;
  daily: number;
  unit: string;
  sub?: SubItem[];
}
interface SubItem {
  label: string;
  tag: string;
  schemaOrgTag: string | null;
  total: number;
  hasRDI: boolean;
  daily: number;
  unit: string;
}
interface FOLAC {
  label: string;
  quantity: number;
  unit: string;
}
