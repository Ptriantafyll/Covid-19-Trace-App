// function that given 2 points on the surface of the earth (lat1, lng1), (lat2, lng2) returns the distance in meteres (rounded up)
function CalculateDistance(lat1, lng1, lat2, lng2) {
  var R = 6371; // radius of the earth
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lng2 - lng1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return Math.ceil(d * 1000);
}

function toRad(Value) {
  return (Value * Math.PI) / 180;
}
export default CalculateDistance;
