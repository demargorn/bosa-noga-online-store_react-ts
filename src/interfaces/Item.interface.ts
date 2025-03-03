export interface IItem {
   id: number;
   category: number;
   title: string;
   images: string;
   sku: string;
   manufacturer: string;
   color: string;
   count?: number;
   material: string;
   reason: string;
   season: string;
   heelSize: string;
   price: number;
   oldPrice: number;
   sizes: Array<{
      size: string;
      available: boolean;
   }>;
}
