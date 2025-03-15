import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      fetch("http://localhost:8000/users/me", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    }
  }, []);

  return <DataContext.Provider value={{ data, isLoading }}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
