import extractId from '../src/extractId';

describe('Test Extract ID', () => {
  const invalidId = 'ciao';
  const notInLast32 = 'https://bbee5f03640f412eb0ae57d96a5252ab//notion.so/';
  const validID = 'bbee5f03640f412eb0ae57d96a5252ab';
  const validString32 =
    'https://www.notion.so/somepage-bbee5f03640f412eb0ae57d96a5252ab';
  const validString36 =
    'https://www.notion.so/somepage-bbee5f03-640f-412e-b0ae-57d96a5252ab';
  const validDashId = 'bbee5f03-640f-412e-b0ae-57d96a5252ab';

  it('Should throw if ID is not in the last 32-36 Characters', () => {
    expect(() => extractId(notInLast32)).toThrowError();
    expect(() => extractId(invalidId)).toThrowError();
  });
  it('Should return the ID with no dash.', () => {
    expect(extractId(validString32, false)).toBe(validID);
    expect(extractId(validString36, false)).toBe(validID);
    expect(extractId(validID, false)).toBe(validID);
    expect(extractId(validDashId, false)).toBe(validID);
    expect(extractId(validString36, false)).toBe(validID);
  });
  it('Should return the ID with dashes', () => {
    expect(extractId(validString32, true)).toBe(validDashId);
    expect(extractId(validString36, true)).toBe(validDashId);
    expect(extractId(validID, true)).toBe(validDashId);
    expect(extractId(validDashId, true)).toBe(validDashId);
  });
  it('Should pass the ID through', () => {
    expect(extractId(validID, false)).toBe(validID);
    expect(extractId(validString32, false)).toBe(validID);
    expect(extractId(validDashId, true)).toBe(validDashId);
  });
});
