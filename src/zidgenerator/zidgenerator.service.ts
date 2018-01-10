/**
 * Represents a service that can generate an id for an element based on its
 * hierarchial structure.
 *
 * @this {IZIdGeneratorService}
 */
export interface IZIdGeneratorService {
    /**
     * Generates an attribute for an element given the z* base value.
     *
     * @param {String} attr The attribute to add.
     * @param {String} zValue The value of z*.
     * @param {HTMLElement} element The element to generate the attribute for.
     *
     * @return {boolean | HTMLElement}   This method returns false if the id cannot be
     *                                  generated given the current state of the element.
     *                                  If an id is generated, then element is returned
     *                                  with the updated attribute.
     */
    generateAttributeForElement(attr: string, zValue: string, element: HTMLElement): boolean | HTMLElement;

    /**
     * Generates a for attribute for an element.
     *
     * @param {String} zForId The value of the zForId.
     * @param {HTMLElement} element The element to generate the for attribute for.
     *
     * @return {boolean | HTMLElement}  This method returns false if the for attribute cannot be
     *                                  generated given the current state of the element.
     *                                  If an attribute is generated, then element is returned
     *                                  with the updated attribute.
     */
    generateForIdForElement(zForIdValue: string, element: HTMLElement): boolean | HTMLElement;

    /**
     * Generates an id attribute for an element.
     *
     * @param {String} zIdValue The value of the zid.
     * @param {HTMLElement} element The element to generate the id for.
     *
     * @return {boolean | HTMLElement}  This method returns false if the id cannot be
     *                                  generated given the current state of the element.
     *                                  If an attribute is generated, then element is returned
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
     * Generates an attribute for an element given the z* base value.
     *
     * @param {String} attr The attribute to add.
     * @param {String} zValue The value of z*.
     * @param {HTMLElement} element The element to generate the attribute for.
     *
     * @return {boolean | HTMLElement}   This method returns false if the id cannot be
     *                                  generated given the current state of the element.
     *                                  If an id is generated, then element is returned
     *                                  with the updated attribute.
     */
    public generateAttributeForElement(attr: string, zValue: string, element: HTMLElement): boolean | HTMLElement {
        let rootElementWithId: HTMLElement = null;

        if (!zValue || !element || !!element.getAttribute(attr)) {
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
        element.setAttribute(attr, `${rootId}-${zValue}`);
        return element;
    }

    /**
     * Generates the for attribute for label.
     *
     * @param {String} zForIdValue The
     */
    public generateForIdForElement = (zForIdValue: string, element: HTMLElement) => this.generateAttributeForElement('for', zForIdValue, element);

    /**
     * Generates an id for an element given the base value.
     */
    public generateIdForElement = (zIdValue: string, element: HTMLElement) => this.generateAttributeForElement('id', zIdValue, element);
}
