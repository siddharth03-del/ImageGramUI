// Store the token
export function storeToken(email, token) {
    localStorage.setItem(`token_${email}`, token);
  }
  // Retrieve the token
export function getToken(email) {
    return localStorage.getItem(`token_${email}`);
  }
  
  // Remove the token
export function removeToken(email) {
    localStorage.removeItem(`token_${email}`);
  }

export function setCurrentUser(currentUser){
  localStorage.setItem("currentUser", currentUser);
}

export function fetchCurrentUser(){
  return localStorage.getItem("currentUser");
}