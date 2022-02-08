const getCookie = (name) => {
  const cookies = document.cookie;

  const cookieSearch = cookies
    .split('; ')
    .find(row => row.startsWith(`${name}=`))
  
  return cookieSearch ? cookieSearch.split('=')[1] : false;
}

const setCookie = (name, value, expiryInHours) => {
  const expiryDate = new Date();
  expiryDate.setTime(expiryDate.getTime() + ((expiryInHours - 3) * 60 * 60 * 1000));
  const expires = `expires=${expiryDate.toUTCString()}`;

  document.cookie = `${name}=${value};${expires};path=/`;
}

const deleteCookie = () => {
  document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
}

export {
  getCookie,
  deleteCookie,
  setCookie
};