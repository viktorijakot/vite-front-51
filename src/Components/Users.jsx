import axios from "axios";
import { useEffect, useState } from "react";

function Users() {
  const URL = "http://localhost:3000/api/users";
  const [users, setUsers] = useState();
  const [nameVal, setnameVal] = useState("");
  const [townValue, settownValue] = useState("");
  const [isDriver, setisDriver] = useState(false);

  // parsisiusti users ir iskonsolinti
  //sugeneruoti html

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    axios
      .get(URL)
      .then((resp) => {
        console.log(resp.data);
        setUsers(resp.data);
      })
      .catch((err) => console.log(err));
  }

  function handleNewUserSubmit(event) {
    event.preventDefault();
    console.log("js is in control");
    // sudeti viska i viena obj
    const newUser = {
      name: nameVal,
      town: townValue,
      isDriver,
    };
    console.log("newUser ===", newUser);
    // siusiuti ta ob i back
    axios
      .post(URL, newUser)
      .then((ats) => {
        console.log("ats ===", ats);
        if (ats.status === 201) {
          // success useris sukurtas
          // atnaujinti sarasa
          getUsers();
          return;
        }
        // neskeme, nepavyko
      })
      .catch((error) => {
        console.warn("ivyko klaida:", error);
        // show errors
        alert("klaida");
      });
    // pavyko ar ne
  }

  //delete mygtukas

  const handleDelete = (e) => {
    const id = e.target.id;
    console.log(id);
    axios
      .delete(`${URL}/${id}`)
      .then((ats) => {
        if (ats.status === 201) {
          // success useris sukurtas
          // atnaujinti sarasa
          getUsers();
          return;
        }
      })
      .catch((error) => {
        console.warn("ivyko klaida:", error);
        // show errors
        alert("klaida");
      });
    // pavyko ar ne
  };

  const handleEdit = (e) => {
    const id = +e.target.id;
    const name = users.filter((usersObj) => usersObj.id === id)[0].name;
    const town = users.filter((usersObj) => usersObj.id === id)[0].town;
    const isDriver = users.filter((usersObj) => usersObj.id === id)[0].isDriver;
    setnameVal(name);
    settownValue(town);
    setisDriver(isDriver);
  };

  return (
    <div>
      <h2>Users</h2>

      <h3>Add new User</h3>
      <form onSubmit={handleNewUserSubmit} className="border p-4 ">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            className="form-control"
            value={nameVal}
            type="text"
            id="name"
            onChange={(e) => setnameVal(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="town" className="form-label">
            Town
          </label>
          <input
            className="form-control"
            type="text"
            id="town"
            value={townValue}
            onChange={(e) => settownValue(e.target.value)}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            className="form-check-input"
            checked={isDriver}
            onChange={(e) => setisDriver(e.target.checked)}
            type="checkbox"
            id="exampleCheck1"
          />
          <label htmlFor="exampleCheck1" className="form-check-label">
            Driver
          </label>
        </div>
        <button type="submit" className="btn btn-outline-info">
          ADD
        </button>
      </form>
      <ul className="list-group">
        {users &&
          users.map((userObj) => (
            <li key={userObj.id} className="list-group-item">
              id: {userObj.id}, name: {userObj.name}, town: {userObj.town}, is
              driver: {userObj.isDriver === true ? "YES" : "NO"}
              <button
                id={userObj.id}
                className="btn btn-danger mx-3"
                onClick={handleDelete}
              >
                delete
              </button>
              <button
                id={userObj.id}
                onClick={handleEdit}
                className="btn btn-success"
              >
                edit
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Users;
