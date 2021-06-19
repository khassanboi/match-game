interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  score: number;
  avatar: string | null;
}

class UsersStore {
  // methods to use
  _getAllUsers(): User[] {
    let db = null;
    const req = indexedDB.open("users", 1);

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
    let users: User[] = [];

    this._operationWithDB("getUsers", db, undefined, (user) => {
      users.push(user);
    });

    return users;
  }

  _addUser(newUser: User): void {
    let db = null;
    const req = indexedDB.open("users", 1);

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

    this._operationWithDB("addUser", db, newUser);
  }

  _updateScore(currentUser: User): void {
    let db = null;
    const req = indexedDB.open("users", 1);

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

    this._operationWithDB("updateScore", db, currentUser);
  }

  private _operationWithDB(method: "getUsers" | "addUser" | "updateScore", db, user?: User, success?: (User) => void): void {
    const tx = db.transaction("usersData", "readonly");
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

      creq.error = () => {
        alert(`ERROR: ${creq.error}`);
      };
    } else if (method === "addUser") {
      usersData.add(user);
    } else if (method === "updateScore") {
      usersData.put(user);
    }
  }
}
