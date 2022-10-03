# Education React Project Github

## Table of Content
- Disclaimer
- Deskripsi
- Mari Kita Buat
    - Langkah 0 - Create React App
    - Langkah 1 - Inisialisasi Token Github
    - Langkah 2 - Membuat Kerangka Aplikasi
    - Langkah 3 - Wiring React dengan API Github dengan Axios

## Disclaimer
Karena pembelajaran ini bersifat review, maka akan ada lebih sedikit comment pada kode dibandingkan pembelajaran sebelumnya, apabila dirasa bingung dengan kode yang ada, maka sebaiknya harus mempelajari dasar React-nya terlebih dahulu sebelum melihat pembelajaran ini !

## Deskripsi

Pada pembelajaran ini kita akan mencoba untuk membuat aplikasi sederhana pada react yang menggabungkan beberapa elemen React di dalamnya seperti:
- Component
- Hooks
- Navigation: React Router
- Data Fetcher: Axios
- UI Framework: MUI

Hasil akhir dari project ini adalah sebuah aplikasi yang menggunakan Personal Access Token dari Github untuk bisa membaca repository yang dimiliki sendiri serta dapat membuat repository berbasis nodejs secara mandiri dari aplikasi yang dibuat.

## Mari kita buat !

Langkah-langkahnya adalah sebagai berikut:

### Langkah 0 - Create React App
1. Buka `terminal` / `cmd` / `git bash` yang digunakan
1. Ketik perintah `npx create-react-app project-github-fetcher` 
1. Tunggu sampai CRA nya selesai...
1. Masuk ke dalam folder CRA tersebut dengan perintah `cd project-github-fetcher`
1. Install package tambahan yang diperlukan (axios) dengan perintah `npm i axios`
1. Install package tambahan yang diperlukan (MUI) dengan perintah `npm i @mui/material @emotion/react @emotion/styled`
1. Install package tambahan yang diperlukan (React Router) dengan perintah `npm i react-router-dom@6`

Sampai di titik ini artinya kita sudah selesai untuk menginisialisasi project.

Selanjutnya kita akan meminta `Personal Access Token` dari Github berdasarkan akun pribadi Github yang dimiliki.

### Langkah 1 - Inisialisasi Token Github 
1. Buka halaman [github](https://github.com) dan sign-in terlebih dahulu
1. Buka halaman [Personal access tokens](https://github.com/settings/tokens) lalu pilih `Generate new token`
1. Berikan `note` yang menjelaskan kegunaan token ini. Dalam pembelajaran ini hanya menuliskan `Untuk belajar React` saja
1. Untuk expiration silahkan dipilih sesuatu kebutuhan, dalam pembelajaran ini menggunakan expiration `custom` - 1 hari saja
1. Selanjutnya kita akan memilih scope apa saja yang dapat dilakukan dengan menggunakan token yang dimiliki. Scope adalah batasan yang dapat dipilih, biasanya berbeda antar API. Scope yang digunakan dalam pembelajaran ini adalah:
    - `repo`
    - `delete_repo`
1. Setelah selesai tekan tombol `Generate token`
1. Selanjutnya Github akan memberikan token untuk dapat kita gunakan. **CATAT** token tersebut baik baik karena hanya akan diperlihatkan **SEKALI** saja. Apabila hilang, harus **GENERATE ULANG** token yang diberikan !

Sampai di titik ini artinya kita sudah berhasil Generate token dari Github.

Selanjutnya kita akan membuat component React yang akan digunakan dalam aplikasi ini nantinya.

(Tenang, kita tidak menggunakan `useReducer` untuk mempersingkat alur pembuatan aplikasi !)

### Langkah 2 - Membuat Kerangka Aplikasi
Dalam aplikasi ini kita akan membuat 3 Route utama, yaitu:
- `/` - yang berisi beberapa Link, untuk menuju `/list` dan `/add`
- `/list` - yang berisi Listing dari repository yang dimiliki, baik `public` maupun `private` repository
- `/add` - yang berisi sebuah Form untuk membuat sebuah repository `NodeJS` yang baru, yang dapat memilih apakah sifatnya `public` ataupun `private` repository

#### Langkah 2.0 - Memodifikasi Template CRA
Pada langkah ini kita akan memodifikasi template CRA bawaan sehingga menjadi blank page saja.

1. Buka file `index.js` dan comment perintah `import ./index.css`, `import App from ./App` dan `<App />`
    ```JSX
    import React from "react";
    import ReactDOM from "react-dom/client";
    // import './index.css';
    // import App from "./App";
    import reportWebVitals from "./reportWebVitals";

    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
      <React.StrictMode>
        {/* <App /> */}
      </React.StrictMode>
    );

    // If you want to start measuring performance in your app, pass a function
    // to log results (for example: reportWebVitals(console.log))
    // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
    reportWebVitals();
    ```
1. Modifikasi file `App.js` untuk tidak menampilkan apa apa (akan dimodifikasi nanti)
    ```JSX
    import React from "react";
    // import logo from './logo.svg';
    // import './App.css';

    function App() {
      return <div className="App"></div>;
    }

    export default App;
    ```

#### Langkah 2.1 - Dummy Component
Pada langkah ini kita akan membuat Component yang kosongan terlebih dahulu, hanya agar dapat membuat `Route` nya

1. Buat folder `/src/components` dan `/src/containers`
1. Buat file `/src/components/NavBar.jsx` dan menuliskan kode dasar sebagai berikut:
    ```JSX
    import React from "react";

    const NavBar = () => {
      return (
        <>
          <h1>NavBar</h1>
        </>
      );
    };

    export default NavBar;
    ```
1. Buat file `/src/containers/ListRepositories.jsx` dan menuliskan kode dasar sebagai berikut:
    ```JSX
    import React from "react";

    const ListRepositories = () => {
      return (
        <>
          <h1>ListRepositories</h1>
        </>
      );
    };

    export default ListRepositories;
    ```
1. Buat file `/src/containers/FormAddRepository.jsx` dan menulikan kode dasar sebagai berikut:
    ```JSX
    import React from "react";

    const FormAddRepository = () => {
      return (
        <>
          <h1>FormAddRepository</h1>
        </>
      );
    };

    export default FormAddRepository;
    ```

Sampai pada titik ini kita sudah selesai untuk membuat Dummy Component, selanjutnya kita akan mencoba untuk membuat Routingnya dan menampilkan seluruh dummy component yang dibuat.

#### Langkah 2.2 - Routing
Pada langkah ini kita akan membuat routing yang dideklarasikan seluruhnya pada `index.js`

1. Sekarang kita akan mendefinisikan route yang ada pada aplikasi yang dibuat. Buka file `index.js` dan modifikasi kode menjadi sebagai berikut:
    ```JSX
    import React from "react";
    import ReactDOM from "react-dom/client";
    // import './index.css';

    import App from "./App";
    import ListRepositories from "./containers/ListRepositories";
    import FormAddRepository from "./containers/FormAddRepository";

    import reportWebVitals from "./reportWebVitals";

    // import react router dom
    import { BrowserRouter, Routes, Route } from "react-router-dom";

    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
      <React.StrictMode>
        {/* <App /> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="/list" element={<ListRepositories />} />
              <Route path="/add" element={<FormAddRepository />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    );

    // If you want to start measuring performance in your app, pass a function
    // to log results (for example: reportWebVitals(console.log))
    // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
    reportWebVitals();
    ```
1. Selanjutnya kita akan menambahkan komponen `NavBar` pada `App.js` dan membuat `App.js` bisa menampilkan rute anakannya (`Child Route`). Buka file `App.js` dan modifikasi kode menjadi sebagai berikut:
    ```JSX
    import React from "react";
    // import logo from './logo.svg';
    // import './App.css';

    import { Outlet } from "react-router-dom";
    import NavBar from "./components/NavBar";

    function App() {
      return (
        <div className="App">
          <NavBar />
          <Outlet />
        </div>
      );
    }

    export default App;
    ```
1. Selanjutnya kita akan memodifikasi NavBar agar dapat menampilkan rute menuju `/list` dan `/add`. Buka file `/src/components/NavBar.jsx` dan modifikasi kode sebagai berikut:
    ```jsx
    import React from "react";
    import { Link } from "react-router-dom";
    import { Box, Typography } from "@mui/material";

    const NavBar = () => {
      return (
        <>
          <Box
            sx={{
              display: "flex",
              gap: "0.5em",
              border: "1px dashed grey",
              p: 2,
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h5">Github Apps</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "0.5em",
              }}
            >
              <Link to="/list">
                <Typography variant="body2">List</Typography>
              </Link>
              <Link to="/add">
                <Typography variant="body2">Add</Typography>
              </Link>
            </Box>
          </Box>
        </>
      );
    };

    export default NavBar;
    ```

#### Langkah 2.3


### Langkah 3 - Wiring React dengan API Github dengan Axios

Untuk membaca tentang API dari Github dapat membuka dokumentasi yang ada di sini yah:
- [Getting Started](https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api)
- [Listing Repos](https://docs.github.com/en/rest/repos/repos#list-repositories-for-the-authenticated-user)
- [Buat Repo Baru](https://docs.github.com/en/rest/repos/repos#create-a-repository-for-the-authenticated-user)