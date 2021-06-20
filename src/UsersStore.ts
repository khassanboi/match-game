export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  score: number;
  avatar: string | null;
}

export default class UsersStore {
  // methods
  _getAllUsers(): User[] {
    let users: User[] = [];

    this._operationWithDB("getUsers", undefined, (user) => {
      users.push(user);
    });

    return users;
  }

  _addUser(newUser: User): void {
    this._operationWithDB("addUser", newUser);
  }

  _updateScore(currentUser: User): void {
    this._operationWithDB("updateScore", currentUser);
  }

  private _operationWithDB(method: "getUsers" | "addUser" | "updateScore", user?: User, success?: (User) => void): void {
    let db = null;
    const req = indexedDB.open("khassanboi", 1);

    req.onupgradeneeded = (e) => {
      db = req.result;
      const users = db.createObjectStore("usersData", { keyPath: "id" });
    };

    req.onsuccess = (e) => {
      db = req.result;
    };

    req.onerror = (e) => {
      alert("ERROR");
    };

    setTimeout(() => {

      const tx = method == "getUsers" ? db.transaction("usersData", "readonly") : db.transaction("usersData", "readwrite");
      tx.onerror = (e) => alert("There was an error: " + e.target.errorCode);
      const usersData = tx.objectStore("usersData");

      if (method === "getUsers") {
        const creq = usersData.openCursor();

        creq.onsuccess = (e) => {
          const cursor = creq.result || e.target.result;

          if (cursor) {
            const user: User = cursor.value;
            success(user);
            cursor.continue();
          }
        };
      } else if (method === "addUser") {
        usersData.add(user);
      } else if (method === "updateScore") {
        usersData.put(user);
      }
    }, 500);
  }
}
