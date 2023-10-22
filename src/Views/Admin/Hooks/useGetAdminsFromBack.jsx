import { useState, useEffect } from "react";
import axios from "axios";
import useAuthToken from "./useAuthToken";

function useGetAdminsFromBack() {
  const [loading, setLoading] = useState(false);
  const [errorGetAdmins, setErrorGetAdmins] = useState(false);
  const [admins, setAdmins] = useState("");
  const [notSuggestion, setNotSuggestion] = useState(false);
  const [message, setMessage] = useState('')

  const {authToken} = useAuthToken();
  const [resetSearhBar, setResetSearchBar] = useState(0)


  useEffect(() => {
    const fetchAdmins = async () => {
      await getAdmin();
    };
    if(authToken )fetchAdmins();
  }, [authToken]);

  
  const handleGetSuggestions = async (email) => {
    const emailTest = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    setLoading(true);

    if (emailTest.test(email)) {
      try {
        const URL = "https://ge3k-server.onrender.com/Admin/email/";
        const { data } = await axios.get(URL + email, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setResetSearchBar((prevState) => prevState + 1);
        if (data.length === 0) {
          setNotSuggestion(true);
        } else {
          setNotSuggestion(false);
        }
        setAdmins([data]);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          setLoading(false);
          if (error.response.data) {
            setLoading(false);
            setErrorGetAdmins(error.response.data.message);
            setTimeout(() => {
              setErrorGetAdmins(false);
            }, 5000);
          }
        } else {
          setLoading(false);
          setErrorGetAdmins(
            "Could not retrieve a response from the server. Please check your Internet connection"
          );
          setTimeout(() => {
            setErrorGetAdmins(false);
          }, 5000);
        }
      }
    } else {
      setErrorGetAdmins("Please enter a valid email address");
      setLoading(false);
      setTimeout(() => {
        setErrorGetAdmins(false);
      }, 5000);
    }
  };

  const getAdmin = async () => {
    setLoading(true);

    const URL = "https://ge3k-server.onrender.com/admin/";

    try {
      const { data } = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setAdmins(data);

      setLoading(false);
    } catch (error) {
      if (error.response) {
        setLoading(false);
        if (error.response.data) {
          setLoading(false);
          setErrorGetAdmins(error.response.data.message);
          setTimeout(() => {
            setErrorGetAdmins(false);
          }, 5000);
        }
      } else {
        setLoading(false);
        setErrorGetAdmins(
          "Could not retrieve a response from the server. Please check your Internet connection"
        );
        setTimeout(() => {
          setErrorGetAdmins(false);
        }, 5000);
      }
    }
  };

  const handleBan = async (id) => {
    setLoading(true);

    const URL = "https://ge3k-server.onrender.com/Admin/";

    try {
      await axios.delete(URL + id, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      await getAdmin();
      setLoading(false);
      setMessage("Admin successfully banned");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } catch (error) {
      if (error.response) {
        setLoading(false);
        if (error.response.data) {
          setLoading(false);
          setErrorGetAdmins(error.response.data.message);
          setTimeout(() => {
            setErrorGetAdmins(false);
          }, 5000);
        }
      } else {
        setLoading(false);
        setErrorGetAdmins(
          "Could not retrieve a response from the server. Please check your Internet connection"
        );
        setTimeout(() => {
          setErrorGetAdmins(false);
        }, 5000);
      }
    }
  };

  const handleUnban = async (id) => {
    setLoading(true);

    const URL = "https://ge3k-server.onrender.com/Admin/";

    try {
      await axios.patch(URL + id, {}, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      await getAdmin();
      setLoading(false);
      setMessage("Admin successfully Unbanned");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } catch (error) {
      if (error.response) {
        setLoading(false);
        if (error.response.data) {
          setLoading(false);
          setErrorGetAdmins(error.response.data.message);
          setTimeout(() => {
            setErrorGetAdmins(false);
          }, 5000);
        }
      } else {
        setLoading(false);
        setErrorGetAdmins(
          "Could not retrieve a response from the server. Please check your Internet connection"
        );
        setTimeout(() => {
          setErrorGetAdmins(false);
        }, 5000);
      }
    }
  };


  const handleNewPassword = async(admin, password)=>{

    console.log('entrando al hook')
    setLoading(true);

    const URL = "https://ge3k-server.onrender.com/admin/cc/";

    const adminDataForBody = {
      email:admin.email,
      password
    }
console.log(adminDataForBody)
    try {
      await axios.put(URL + admin.id, adminDataForBody, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      await getAdmin();
      setLoading(false);
      setMessage("Password uploaded successfully");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } catch (error) {
      if (error.response) {
        setLoading(false);
        if (error.response.data) {
          setLoading(false);
          setErrorGetAdmins(error.response.data.message);
          setTimeout(() => {
            setErrorGetAdmins(false);
          }, 5000);
        }
      } else {
        setLoading(false);
        setErrorGetAdmins(
          "Could not retrieve a response from the server. Please check your Internet connection"
        );
        setTimeout(() => {
          setErrorGetAdmins(false);
        }, 5000);
      }
    }


  }

  return {
    admins,
    notSuggestion,
    loading,
    resetSearhBar,
    setLoading,
    errorGetAdmins,
    message,
    handleBan,
    handleUnban,
    handleNewPassword,
    handleGetSuggestions,
    getAdmin,
  };
}

export default useGetAdminsFromBack;
