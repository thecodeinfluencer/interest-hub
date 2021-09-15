export function getInitials(user) {
  return user?.firstName?.slice(0, 1) + user?.surname?.slice(0, 1);
}

export function distance(lat1, lon1, lat2, lon2) {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;

    //Into KM
    dist = dist * 1.609344;

    return dist;
  }
}

export function formatDistance(dist) {
  dist = dist.toFixed(1);
  var units = ' KM';

  if (dist < 1) {
    dist = dist * 1000;
    dist = dist.toFixed(0);
    units = ' M';
  }
  return dist + units;
}

export function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function removeDuplicates(data, key) {
  return [...new Map(data.map(item => [key(item), item])).values()];
}
