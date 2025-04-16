export const logOut = () => {
   localStorage.removeItem('token');
   localStorage.removeItem('userId');
   localStorage.removeItem('userRole');
   window.location.href = '/';
};