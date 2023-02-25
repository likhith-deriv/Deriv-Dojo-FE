export const setUserInfo = user_obj => {
    const { displayName, email, photoURL } = user_obj;
    localStorage.setItem('name', displayName);
    localStorage.setItem('email', email);
    localStorage.setItem('profile_img', photoURL);
};
