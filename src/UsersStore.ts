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
  getAllUsers(): User[] {
    const users: User[] = [];

    this.operationWithDB("getUsers", undefined, (user) => {
      users.push(user);
    });

    return users;
  }

  addUser(newUser: User): void {
    this.operationWithDB("addUser", newUser);
  }

  updateScore(currentUser: User): void {
    this.operationWithDB("updateScore", currentUser);
  }

  private operationWithDB = (
    method: "getUsers" | "addUser" | "updateScore",
    user?: User,
    success?: (User) => void
  ): void => {
    let db = null;
    const req = indexedDB.open("khassanboi", 1);

    req.onupgradeneeded = async () => {
      db = await req.result;
      db.createObjectStore("usersData", { keyPath: "id" });
    };

    req.onsuccess = async () => {
      db = await req.result;

      const tx =
        method === "getUsers"
          ? db.transaction("usersData", "readonly")
          : db.transaction("usersData", "readwrite");
      tx.onerror = (e) => alert(`There was an error: ${e.target.errorCode}`);
      const usersData = tx.objectStore("usersData");

      if (method === "getUsers") {
        const creq = usersData.openCursor();

        creq.onsuccess = (event) => {
          const cursor = creq.result || event.target.result;

          if (cursor) {
            const userCursor: User = cursor.value;
            success(userCursor);
            cursor.continue();
          }
        };
      } else if (method === "addUser") {
        usersData.add(user);
      } else if (method === "updateScore") {
        usersData.put(user);
      }
    };

    req.onerror = () => {
      alert("ERROR");
    };
  };
}
