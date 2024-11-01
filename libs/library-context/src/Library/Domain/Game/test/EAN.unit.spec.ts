import { EAN } from '../EAN';

describe('EAN', () => {
  it('should be able to create from a valid EAN', () => {
    const EANCode = '4260470080018';
    const gameId = new EAN(EANCode);
    expect(gameId).toBeInstanceOf(EAN);
    expect(gameId.value).toBe(`4260470080018`);
  });
  it('should throw an error if EAN is null', () => {
    try {
      new EAN(null);
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('EAN is required');
    }
  });
  it('should throw an error if EAN length is not 13', () => {
    try {
      new EAN('123456789012');
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(RangeError);
      expect(error.message).toBe('EAN must be 13 characters');
    }
  });
});
