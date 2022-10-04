import React, { createContext, useState, useContext } from "react";

const GithubContext = createContext();

const GithubProvider = ({ children }) => {
  const [repositories, setRepositories] = useState([]);

  // Sebenarnya bisa saja bila kita ingin membuatnya di sini (useEffect call API Github)
  // Tapi di sini kita akan ignore hal tersebut

  return (
    // Ceritanya di sini kita akan memprovide state dan setter state yang digunakan
    // dalam useState yang ada di atas ke dalam Provider
    <GithubContext.Provider value={{ repositories, setRepositories }}>
      {children}
    </GithubContext.Provider>
  );
};

// Gunakan custom Hooks di sini
const useGithub = () => {
  const context = useContext(GithubContext);

  // cek bila undefined
  if (context === undefined) {
    throw new Error("useGithub wajib dipakai di dalam GithubProvider !");
  }

  return context;
};

export { GithubProvider, useGithub };
