import {ZIdGeneratorService} from './zidgenerator.service';

describe('ZIdGeneratorService', () => {
    const RootId: string = 'foo';
    const ZValue: string = 'bar';

    let rootElementWithId: HTMLElement;
    let childElementWithZValue: HTMLElement;
    let grandChildElementWithZValue: HTMLElement;

    beforeEach(() => {
        rootElementWithId = document.createElement('div');
        childElementWithZValue = document.createElement('div');
        grandChildElementWithZValue = document.createElement('div');

        rootElementWithId.setAttribute('id', RootId);

        rootElementWithId.appendChild(childElementWithZValue);
        childElementWithZValue.appendChild(grandChildElementWithZValue);
    });

    function createTestTarget() {
        return new ZIdGeneratorService();
    }

    function generateTestSuite(zname: string, attr: string, generatorFunc: (t: ZIdGeneratorService, a: string, e: HTMLElement) => boolean | HTMLElement) {
        describe(`with a falsy value for ${zname}`, () => {
            it('returns falsy.', () => {
                // Arrange
                let target = createTestTarget();
                // Act
                let result = generatorFunc(target, null, childElementWithZValue);
                // Assert
                expect(result).toEqual(false);
            });
        });

        describe('with a falsy value for the element', () => {
            it('returns falsy.', () => {
                // Arrange
                let target = createTestTarget();
                // Act
                let result = generatorFunc(target, ZValue, null);
                // Assert
                expect(result).toEqual(false);
            });
        });

        describe(`with an element that already has an ${attr}`, () => {
            let childId: string;

            beforeEach(() => {
                childId = 'bar';
                childElementWithZValue.setAttribute(attr, childId);
            });

            it('uses the id.', () => {
                // Arrange
                let target = createTestTarget();
                // Act
                generatorFunc(target, attr, childElementWithZValue);
                // Assert
                expect(childElementWithZValue.getAttribute(attr)).toEqual(childId);
            });

            it('returns false.', () => {
                // Arrange
                let target = createTestTarget();
                // Act
                let result = generatorFunc(target, 'foo', childElementWithZValue);
                // Assert
                expect(result).toEqual(false);
            });
        });

        describe('with a root element that has an id', () => {
            it('generates the id from the parent.', () => {
                // Arrange
                let parentId = `${RootId}-child`;
                let expected = `${parentId}-${ZValue}`;
                let target = createTestTarget();
                childElementWithZValue.setAttribute('id', parentId);
                // Act
                generatorFunc(target, ZValue, grandChildElementWithZValue);
                // Assert
                expect(grandChildElementWithZValue.getAttribute(attr)).toEqual(expected);
            });

            it('generates the id by taking the first ancestor that has one.', () => {
                // Arrange
                let expected = `${RootId}-${ZValue}`;
                let target = createTestTarget();
                // Act
                generatorFunc(target, ZValue, grandChildElementWithZValue);
                // Assert
                expect(grandChildElementWithZValue.getAttribute(attr)).toEqual(expected);
            });

            it('returns the element.', () => {
                // Arrange
                let target = createTestTarget();
                // Act
                let result = generatorFunc(target, ZValue, grandChildElementWithZValue);
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
                generatorFunc(target, ZValue, grandChildElementWithZValue);
                // Assert
                expect(grandChildElementWithZValue.getAttribute(attr)).toBeFalsy();
            });

            it('returns false.', () => {
                // Arrange
                let target = createTestTarget();
                // Act
                let result = generatorFunc(target, ZValue, grandChildElementWithZValue);
                // Assert
                expect(result).toEqual(false);
            });
        });
    }

    describe('when generating the id attribute', () => {
        generateTestSuite('zId', 'id', (t, a, e) => t.generateIdForElement(a, e));
    });

    describe('when generating the for attribute', () => {
        generateTestSuite('zForId', 'for', (t, a, e) => t.generateForIdForElement(a, e));
    });
});
