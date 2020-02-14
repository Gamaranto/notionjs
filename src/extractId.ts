export default extractID;

// ******************************

function hasDash(id: string) {
  let idRegex = new RegExp(
    /^[a-z,0-9]{8}-[a-z,0-9]{4}-[a-z,0-9]{4}-[a-z,0-9]{4}-[a-z,0-9]{12}$/g
  );
  return idRegex.test(id);
}

function hasNoDash(id: string) {
  let idRegex = new RegExp(
    /^[a-z,0-9]{8}[a-z,0-9]{4}[a-z,0-9]{4}[a-z,0-9]{4}[a-z,0-9]{12}$/g
  );
  return idRegex.test(id);
}

function toDash(id: string) {
  if (hasDash(id)) {
    return id;
  }
  return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(
    16,
    20
  )}-${id.slice(20)}`;
}

function toNoDash(id: string) {
  if (hasNoDash(id)) {
    return id;
  }
  return id.replace(/-/g, '');
}

function idFromUrl(
  url: string,
  { withDash = true }: { [k: string]: boolean } = {}
) {
  var id = url.slice(-32);
  return withDash ? toDash(id) : toNoDash(id);
}

function extractID(
  urlOrID: string,
  { withDash = true }: { [k: string]: boolean } = {}
) {
  if (hasDash(urlOrID) || hasNoDash(urlOrID)) {
    return withDash ? toDash(urlOrID) : toNoDash(urlOrID);
  }
  return idFromUrl(urlOrID, { withDash });
}
