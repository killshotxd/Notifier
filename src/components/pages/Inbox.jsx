import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../Auth/AuthContext";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";
import { useEffect, useState } from "react";
import moment from "moment";
const Inbox = () => {
  const navigate = useNavigate();

  const { currentUser } = UserAuth();

  const [notification, setNotification] = useState();

  const getAllNotify = async () => {
    const { email } = currentUser;
    // Get user document reference using uid
    const userDocRef = doc(db, "users", email);

    // Get user document snapshot
    const userDocSnapshot = await getDoc(userDocRef);

    // Check if the user document exists
    if (userDocSnapshot.exists()) {
      // Get user data
      const userData = userDocSnapshot.data();

      // Get user sub-collections
      const userCollections = await getDocs(
        collection(db, "users", email, "Notify")
      );

      // Map user sub-collection documents to an array
      const userCollectionData = userCollections.docs.map((doc) => ({
        did: doc.id,
        ...doc.data(),
      }));

      // Combine user data and user sub-collection data
      const userInfo = {
        ...userData,
        Notify: userCollectionData,
      };

      let time = userInfo.Notify.map((res) => {
        const timestamp = moment
          .unix(res.receivedAt.seconds)
          .add(res.receivedAt.nanoseconds / 1e9);
        const timeAgo = timestamp.fromNow();
        return {
          ...res,
          timestamp,
          timeAgo,
        };
      });
      setNotification(time);

      return userInfo;
    } else {
      console.log("User document does not exist.");
    }
  };

  useEffect(() => {
    getAllNotify();
  }, []);

  return (
    <>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead className="bg-blue-100">
            <tr className="bg-blue-100">
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Subject</th>
              <th>Priority</th>
              <th>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/compose")}
                >
                  Compose
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {notification?.map((res) => (
              <>
                <tr key={res.did}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={res.avatar} alt="profile" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{res.senderName}</div>
                        {/* <div className="text-sm opacity-50">United States</div> */}
                      </div>
                    </div>
                  </td>
                  <td>
                    {res.subject.slice(0, 10)}
                    <br />
                    <span className="badge badge-primary badge-sm">
                      {res.timeAgo}
                    </span>
                  </td>
                  <td>
                    {" "}
                    <span className="badge badge-red">
                      {res.important ? "Important" : "General"}
                    </span>
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-xs">View</button>
                  </th>
                </tr>
              </>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            {/* <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr> */}
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default Inbox;
