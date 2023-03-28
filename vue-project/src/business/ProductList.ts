import { getCombinations } from '@/utils';

type ExclusionsList = Array<{ options: (string | number)[], property: string }>;

export interface IProductListResponse {
  title: string;
  sku: string;
  properties: any;
  excludes: ExclusionsList[];
}

export class ProductList {
  private _title: string;
  private _sku: string;
  private _properties: any[];
  private _exclusions: ExclusionsList[];

  constructor({ title, sku, properties, excludes }: IProductListResponse) {
    this._title = title;
    this._sku = sku;
    this._properties = properties;
    this._exclusions = excludes;
  }

  public get options(): any[] {
    return this._properties;
  }

  public checkForExclusions(selectedOptions: { id: string, value: string | number }[]): boolean {
    const selectedIds = selectedOptions.map(el => el.id);

    const selectedIdsCombinations = getCombinations(selectedIds);

    const matchingExclusions: ExclusionsList[] = [];

    selectedIdsCombinations.forEach((combination) => {
      this._exclusions.forEach((exclusion) => {
        if (combination.length !== exclusion.length) {
          return;
        }

        if (combination.every(item => exclusion.map(el => el.property).includes(item))) {
          matchingExclusions.push(exclusion);
        }
      });
    });

    for (let i = 0; i < matchingExclusions.length; i++) {
      const exclusion = matchingExclusions[i];

      const isExclusion = exclusion.every(({ options, property }) => {
        const selectedOption = selectedOptions.find(option => option.id === property);

        if (!selectedOption) return false;

        return options.includes(selectedOption.value);
      });

      if (isExclusion) {
        return true;
      }
    }

    return false;
  }
}
