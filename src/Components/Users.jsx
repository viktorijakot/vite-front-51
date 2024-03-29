import axios from "axios";
import { useEffect, useState } from "react";

function Users() {
  const URL = "http://localhost:3000/api/users";
  const [users, setUsers] = useState();
  const [nameVal, setnameVal] = useState("");
  const [townValue, settownValue] = useState("");
  const [isDriver, setisDriver] = useState(false);
  const [isEditOn, setisEditOn] = useState(false);
  const [currentId, setcurrentId] = useState(0);
  const [errorField, setErrorField] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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

  function clearErrrors() {
    setErrorField("");
    setErrorMsg("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    clearErrrors();
    if (isEditOn) {
      handleUpdateFetch();
    } else {
      handleNewUserSubmit();
    }
  }

  function handleUpdateFetch() {
    console.log("updating");
    const updatedUser = {
      name: nameVal,
      town: townValue,
      isDriver,
    };
    axios
      .put(`${URL}/${currentId}`, updatedUser)
      .then((ats) => setUsers(ats.data))
      .catch((error) => {
        const { status, data } = error.response;
        console.log("data ===", data);
        setErrorField(data.field);
        setErrorMsg(data.error);
      });
  }

  function handleNewUserSubmit() {
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
          setnameVal("");
          settownValue("");
          setisDriver(false);
          return;
        }
        // neskeme, nepavyko
      })
      .catch((error) => {
        console.warn("ivyko klaida:", error);
        // show errors
        const { status, data } = error.response;
        if (status === 400) {
          // handleError(data)
          console.log("data ===", data);
          setErrorField(data.field);
          setErrorMsg(data.error);
        }
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
        // if (ats.status === 201) {
        //   // success useris sukurtas
        //   // atnaujinti sarasa
        //   getUsers();
        //   return;
        // }
        setUsers(ats.data);
      })
      .catch((error) => {
        console.warn("ivyko klaida:", error);
        // show errors
        alert("klaida");
      });
    // pavyko ar ne
  };

  const handleEdit = (id) => {
    // console.log(idToEdit);
    // const id = +e.target.id;
    // const name = users.filter((usersObj) => usersObj.id === id)[0].name;
    // const town = users.filter((usersObj) => usersObj.id === id)[0].town;
    // const isDriver = users.filter((usersObj) => usersObj.id === id)[0].isDriver;
    // setnameVal(name);
    // settownValue(town);
    // setisDriver(isDriver);
    setisEditOn(true);
    fillFormData(id);
    setcurrentId(id);
  };

  const fillFormData = (id) => {
    const found = users.find((uObj) => uObj.id === id);
    setnameVal(found.name);
    settownValue(found.town);
    setisDriver(found.isDriver);
  };

  return (
    <div>
      <h2>Users</h2>

      <h3>Add new User</h3>
      <form onSubmit={handleSubmit} className="border p-4 ">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            className={`form-control ${
              errorField === "name" ? "is-invalid" : ""
            }`}
            value={nameVal}
            type="text"
            id="name"
            onChange={(e) => setnameVal(e.target.value)}
          />
          {errorField === "name" && (
            <span className="text-danger">{errorMsg}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="town" className="form-label">
            Town
          </label>
          <input
            className={`form-control ${
              errorField === "town" ? "is-invalid" : ""
            }`}
            type="text"
            id="town"
            value={townValue}
            onChange={(e) => settownValue(e.target.value)}
          />
          {errorField === "town" && (
            <span className="text-danger">{errorMsg}</span>
          )}
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
        {isEditOn === false && (
          <button type="submit" className="btn btn-outline-info">
            ADD
          </button>
        )}
        {isEditOn === true && (
          <button type="submit" className="btn btn-secondary">
            UPDATE
          </button>
        )}
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
                onClick={() => handleEdit(userObj.id)}
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
