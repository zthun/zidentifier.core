import { IZIdentifierGenerator } from './z-identifier-generator.interface';

/**
 * Represents a basic generator for ids.
 */
export class ZIdentifierGenerator implements IZIdentifierGenerator {
  /**
   * Generates an attribute for an element given the z* base value.
   *
   * @param attr The attribute to generate.
   * @param zValue The value for the attribute.
   * @param element The element to generate the attribute for.
   *
   * @return  This method returns false if the id cannot be generated
   *          given the current state of the element. If an id is
   *          generated, then element is returned with the updated attribute.
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
}
