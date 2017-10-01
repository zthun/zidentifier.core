
export interface IZIdGeneratorService {
    generateIdForElement(zIdValue: string, element: HTMLElement) : Boolean | HTMLElement;
}

export class ZIdGeneratorService implements IZIdGeneratorService {

    public generateIdForElement(zIdValue: string, element: HTMLElement) : Boolean | HTMLElement {
        return false;
    }
}
