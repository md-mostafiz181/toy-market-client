import React from "react";
import "./ToyRow.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ToyRow = ({ toy, toys, setToys }) => {
  const {
    _id,
    photo,
    carName,
    seller,
    email,
    category,
    price,
    rating,
    quantity,
    description
  } = toy;
  // delete start from here
  const handleDelete = (_id) => {
    console.log(_id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://simple-toy-server.vercel.app/toys/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your toy has been deleted.", "success");

              const remaining=toys.filter(c=>c._id !== _id)
              setToys(remaining);
            }
          });
      }
    });
  };

  // delete end from here

  return (
    <tr>
      {/* <th scope="row"></th> */}
      <td>
        <img className="photo" src={photo} alt="" />
      </td>
      <td colspan="1">{carName}</td>
      <td>{seller}</td>
      <td>{email}</td>
      <td>{category}</td>
      <td>{price}</td>
      <td>{description}</td>
      <td>{quantity}</td>
      <td>
        <Link to={`/updateToy/${_id}`}>
          <button className="update">update</button>
        </Link>
      </td>
      <td>
        <button onClick={() => handleDelete(_id)} className="delete">
          delete
        </button>
      </td>
    </tr>
  );
};

export default ToyRow;
