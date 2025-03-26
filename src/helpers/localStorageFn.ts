import { IItem } from '@/interfaces/Item.interface';

/** безопасно записываем в local storage */
export function setLocalStorageItem(key: string, data: IItem) {
   try {
      localStorage.setItem(key, JSON.stringify(data));
   } catch (error) {
      console.error(error);
   }
}

/** безопасно делаем массив из local storage */
export function localStorageToArray(localStorage: Storage): Array<IItem> {
   let arr: Array<IItem> = [];

   try {
      arr = Object.values(localStorage).map((s) => JSON.parse(s));
   } catch (error) {
      console.log(error);
   }

   return arr;
}
