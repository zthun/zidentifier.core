/**
 * Represents a service that can generate an id for an element based on its
 * hierarchial structure.
 *
 * @this {IZIdGeneratorService}
 */
export interface IZIdGeneratorService {
    /**
     * Generates an id for an element given the zId base value.
     *
     * @param {String} zIdValue The value of the zid.
     * @param {HTMLElement} element The element to generate the id for.
     *
     * @return {boolean | HTMLElement}  This method returns false if the id cannot be
     *                                  generated given the current state of the element.
     *                                  If an id is generated, then element is returned
     *                                  with the updated attribute.
     */
    generateIdForElement(zIdValue: string, element: HTMLElement): boolean | HTMLElement;
}

/**
 * Represents an implementation of the IZIdGeneratorService.
 *
 * @this {ZIdGeneratorService}
 */
export class ZIdGeneratorService implements IZIdGeneratorService {
    /**
     * Generates an id for an element given the zId base value.
     *
     * This variation of the implementation will generate the id based on the
     * parent element. For example, a zIdValue of bar and a parent element that
     * has an id of foo will set the id of the element to foo-bar.
     *
     * @param {String} zIdValue The value of the zid.
     * @param {HTMLElement} element The element to generate the id for.
     *
     * @return {boolean | HTMLElement}  This method returns false if the id cannot be
     *                                  generated given the current state of the element.
     *                                  If an id is generated, then element is returned
     *                                  with the updated attribute.
     */
    public generateIdForElement(zIdValue: string, element: HTMLElement): boolean | HTMLElement {
        let rootElementWithId: HTMLElement = null;

        if (!zIdValue || !element || !!element.getAttribute('id')) {
            return false;
        }

        for (let tracer = element.parentElement; !!tracer && rootElementWithId === null; tracer = tracer.parentElement) {
            rootElementWithId = !!tracer.getAttribute('id') ? tracer : null;
        }

        if (!rootElementWithId) {
            // Nobody has an id.
            return false;
        }

        let rootId: string = rootElementWithId.getAttribute('id');
        element.setAttribute('id', `${rootId}-${zIdValue}`);
        return element;
    }
}
