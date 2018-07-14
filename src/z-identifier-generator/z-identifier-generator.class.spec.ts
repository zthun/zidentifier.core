import { ZIdentifierGenerator } from './z-identifier-generator.class';

describe('ZIdentifierGenerator', () => {
  let rootId: string;
  let zValue: string;
  let attr: string;
  let rootElementWithId: HTMLElement;
  let childElementWithZValue: HTMLElement;
  let grandChildElementWithZValue: HTMLElement;

  beforeEach(() => {
    rootId = 'foo';
    zValue = 'bar';
    attr = 'name';

    rootElementWithId = document.createElement('div');
    childElementWithZValue = document.createElement('div');
    grandChildElementWithZValue = document.createElement('div');

    rootElementWithId.setAttribute('id', rootId);

    rootElementWithId.appendChild(childElementWithZValue);
    childElementWithZValue.appendChild(grandChildElementWithZValue);
  });

  function createTestTarget() {
    return new ZIdentifierGenerator();
  }

  describe(`with a falsy value for an attribute`, () => {
    it('returns falsy.', () => {
      // Arrange
      let target = createTestTarget();
      // Act
      let result = target.generateAttributeForElement(attr, null, childElementWithZValue);
      // Assert
      expect(result).toEqual(false);
    });
  });

  describe('with a falsy value for the element', () => {
    it('returns falsy.', () => {
      // Arrange
      let target = createTestTarget();
      // Act
      let result = target.generateAttributeForElement(attr, zValue, null);
      // Assert
      expect(result).toEqual(false);
    });
  });

  describe(`with an element that already has an existing attribute`, () => {
    let childId: string;

    beforeEach(() => {
      childId = 'bar';
      childElementWithZValue.setAttribute(attr, childId);
    });

    it('uses the id.', () => {
      // Arrange
      let target = createTestTarget();
      // Act
      target.generateAttributeForElement(attr, zValue, childElementWithZValue);
      // Assert
      expect(childElementWithZValue.getAttribute(attr)).toEqual(childId);
    });

    it('returns false.', () => {
      // Arrange
      let target = createTestTarget();
      // Act
      let result = target.generateAttributeForElement(attr, zValue, childElementWithZValue);
      // Assert
      expect(result).toEqual(false);
    });
  });

  describe('with a root element that has an id', () => {
    it('generates the id from the parent.', () => {
      // Arrange
      let parentId = `${rootId}-child`;
      let expected = `${parentId}-${zValue}`;
      let target = createTestTarget();
      childElementWithZValue.setAttribute('id', parentId);
      // Act
      target.generateAttributeForElement(attr, zValue, grandChildElementWithZValue);
      // Assert
      expect(grandChildElementWithZValue.getAttribute(attr)).toEqual(expected);
    });

    it('generates the id by taking the first ancestor that has one.', () => {
      // Arrange
      let expected = `${rootId}-${zValue}`;
      let target = createTestTarget();
      // Act
      target.generateAttributeForElement(attr, zValue, grandChildElementWithZValue);
      // Assert
      expect(grandChildElementWithZValue.getAttribute(attr)).toEqual(expected);
    });

    it('returns the element.', () => {
      // Arrange
      let target = createTestTarget();
      // Act
      let result = target.generateAttributeForElement(attr, zValue, grandChildElementWithZValue);
      // Assert
      expect(result).toBe(grandChildElementWithZValue);
    });
  });

  describe('with a root element that does not have an id', () => {
    beforeEach(() => {
      rootElementWithId.removeAttribute('id');
    });

    it('does not generate the id on the native element.', () => {
      // Arrange
      let target = createTestTarget();
      // Act
      target.generateAttributeForElement(attr, zValue, grandChildElementWithZValue);
      // Assert
      expect(grandChildElementWithZValue.getAttribute(attr)).toBeFalsy();
    });

    it('returns false.', () => {
      // Arrange
      let target = createTestTarget();
      // Act
      let result = target.generateAttributeForElement(attr, zValue, grandChildElementWithZValue);
      // Assert
      expect(result).toEqual(false);
    });
  });
});
