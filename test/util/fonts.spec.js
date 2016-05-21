import { expect } from 'chai';
import fonts from '../../app/utils/fonts';

describe('fonts', () => {
  describe('small', () => {
    it('should be loadable', () => {
      fonts.getFont(0);
    });

    it('should have proper dimensions', () => {
      const font = fonts.getFont(0);
      expect(font.dimensions).to.have.all.keys('height', 'width');
    });

    it('should have proper character data', () => {
      const font = fonts.getFont(0);
      const character = font.getData('a'.charCodeAt(0));
      expect(character).to.have.all.keys('outline', 'shape');
      expect(character.outline.length).to.equal(10);
      expect(character.shape.length).to.equal(10);
    });
  });

  describe('medium', () => {
    it('should be loadable', () => {
      fonts.getFont(1);
    });

    it('should have proper dimensions', () => {
      const font = fonts.getFont(1);
      expect(font.dimensions).to.have.all.keys('height', 'width');
    });

    it('should have proper character data', () => {
      const font = fonts.getFont(1);
      const character = font.getData('a'.charCodeAt(0));
      expect(character).to.have.all.keys('outline', 'shape');
      expect(character.outline.length).to.equal(14);
      expect(character.shape.length).to.equal(14);
    });
  });

  describe('large', () => {
    it('should be loadable', () => {
      fonts.getFont(2);
    });

    it('should have proper dimensions', () => {
      const font = fonts.getFont(2);
      expect(font.dimensions).to.have.all.keys('height', 'width');
    });

    it('should have proper character data', () => {
      const font = fonts.getFont(2);
      const character = font.getData('a'.charCodeAt(0));
      expect(character).to.have.all.keys('outline', 'shape');
      expect(character.outline.length).to.equal(18);
      expect(character.shape.length).to.equal(18);
    });
  });

  describe('invalid', () => {
    it('should throw an error', () => {
      const errorMessage = /trying to get unsupported font for size/;
      expect(fonts.getFont).to.throw(Error, errorMessage);
    });
  });
});
