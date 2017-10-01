import {ZIdGeneratorService} from './zidgenerator.service';

describe('ZIdGeneratorService', () => {
    const RootId: string = 'foo';
    const ZId: string = 'bar';

    let rootElementWithId: HTMLElement;
    let childElementWithZId: HTMLElement;
    let grandChildElementWithZId: HTMLElement;

    beforeEach(() => {
        rootElementWithId = document.createElement('div');
        childElementWithZId = document.createElement('div');
        grandChildElementWithZId = document.createElement('div');

        rootElementWithId.setAttribute('id', RootId);

        rootElementWithId.appendChild(childElementWithZId);
        childElementWithZId.appendChild(grandChildElementWithZId);
    });

    function createTestTarget() {
        return new ZIdGeneratorService();
    }

    describe('with a falsy value for zId', () => {
        it('returns falsy.', () => {
            // Arrange
            let target = createTestTarget();
            // Act
            let result = target.generateIdForElement(null, childElementWithZId);
            // Assert
            expect(result).toEqual(false);
        });
    });

    describe('with a falsy value for the element', () => {
        it('returns falsy.', () => {
            // Arrange
            let target = createTestTarget();
            // Act
            let result = target.generateIdForElement(ZId, null);
            // Assert
            expect(result).toEqual(false);
        });
    });

    describe('with an element that already has an id', () => {
        let childId: string;

        beforeEach(() => {
            childId = 'bar';
            childElementWithZId.setAttribute('id', childId);
        });

        it('uses the id.', () => {
            // Arrange
            let target = createTestTarget();
            // Act
            target.generateIdForElement('foo', childElementWithZId);
            // Assert
            expect(childElementWithZId.getAttribute('id')).toEqual(childId);
        });

        it('returns false.', () => {
            // Arrange
            let target = createTestTarget();
            // Act
            let result = target.generateIdForElement('foo', childElementWithZId);
            // Assert
            expect(result).toEqual(false);
        });
    });

    describe('with a root element that has an id', () => {
        it('generates the id from the parent.', () => {
            // Arrange
            let parentId = `${RootId}-child`;
            let expected = `${parentId}-${ZId}`;
            let target = createTestTarget();
            childElementWithZId.setAttribute('id', parentId);
            // Act
            target.generateIdForElement(ZId, grandChildElementWithZId);
            // Assert
            expect(grandChildElementWithZId.getAttribute('id')).toEqual(expected);
        });

        it('generates the id by taking the first ancestor that has one.', () => {
            // Arrange
            let expected = `${RootId}-${ZId}`;
            let target = createTestTarget();
            // Act
            target.generateIdForElement(ZId, grandChildElementWithZId);
            // Assert
            expect(grandChildElementWithZId.getAttribute('id')).toEqual(expected);
        });

        it('returns the element.', () => {
            // Arrange
            let target = createTestTarget();
            // Act
            let result = target.generateIdForElement(ZId, grandChildElementWithZId);
            // Assert
            expect(result).toBe(grandChildElementWithZId);
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
            target.generateIdForElement(ZId, grandChildElementWithZId);
            // Assert
            expect(grandChildElementWithZId.getAttribute('id')).toBeFalsy();
        });

        it('returns false.', () => {
            // Arrange
            let target = createTestTarget();
            // Act
            let result = target.generateIdForElement(ZId, grandChildElementWithZId);
            // Assert
            expect(result).toEqual(false);
        });
    });
});
