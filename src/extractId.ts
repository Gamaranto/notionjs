export default extractID;

// ******************************

let dashIdRegex = new RegExp(
  /^[a-z,0-9]{8}-[a-z,0-9]{4}-[a-z,0-9]{4}-[a-z,0-9]{4}-[a-z,0-9]{12}$/g
);
let noDashIdRegex = new RegExp(
  /^[a-z,0-9]{8}[a-z,0-9]{4}[a-z,0-9]{4}[a-z,0-9]{4}[a-z,0-9]{12}$/g
);

function isValidId(id: string) {
  return dashIdRegex.test(id) || noDashIdRegex.test(id);
}

function hasDash(id: string) {
  return dashIdRegex.test(id);
}

function hasNoDash(id: string) {
  return noDashIdRegex.test(id);
}

function toDash(id: string) {
  return hasDash(id)
    ? id
    : `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(
        16,
        20
      )}-${id.slice(20)}`;
}

function toNoDash(id: string) {
  return hasNoDash(id) ? id : id.replace(/-/g, '');
}

function convertId(id: string, withDash: boolean) {
  return withDash ? toDash(id) : toNoDash(id);
}

function extractID(stringOrID: string, withDash: boolean = true) {
  let noDashId = stringOrID.slice(-32);
  let dashId = stringOrID.slice(-36);
  let isDash = isValidId(dashId);
  let isNoDash = isValidId(noDashId);

  if (isDash || isNoDash) {
    return isNoDash
      ? convertId(noDashId, withDash)
      : convertId(dashId, withDash);
  }
  throw new Error(
    `${stringOrID} does not contain a valid Notion ID. The Notion ID should be the last 32 to 36 characters of the string.`
  );
}
