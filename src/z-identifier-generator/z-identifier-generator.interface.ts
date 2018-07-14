/**
 * Represents a service that can generate an id for an element based on its
 * hierarchial structure.
 */
export interface IZIdentifierGenerator {
  /**
   * Generates an attribute for an element given the z* base value.
   *
   * @param attr The attribute to generate.
   * @param zValue The value of z*.
   * @param element The element to generate the attribute for.
   *
   * @return  This method returns false if the id cannot be generated
   *          given the current state of the element. If an id is
   *          generated, then element is returned with the updated attribute.
   */
  generateAttributeForElement(attr: string, zValue: string, element: HTMLElement): boolean | HTMLElement;
}
