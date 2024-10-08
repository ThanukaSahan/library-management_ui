import { jwtDecode } from "jwt-decode";

class JWTService {
  static getToken() {
    return sessionStorage.getItem("token");
  }

  static setToken(token) {
    sessionStorage.setItem("token", token);
  }

  static clearToken() {
    localStorage.removeItem("token");
  }

  static getRole() {
    const palyload = jwtDecode(this.getToken());
    return palyload.role;
  }

  static pageAccess(roles) {
    const roleArry = roles.split(",");
    for (let i = 0; i < roleArry.length; i++) {
      if (roleArry[i] === this.getRole()) {
        return true;
      }
    }
    return false;
  }
}

export default JWTService;
