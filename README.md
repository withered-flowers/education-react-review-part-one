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
                alignItems: "center",
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

Sampai pada titik ini seharusnya kita sudah mendapatkan Component NavBar yang bisa tekan dan berpindah ke routing `/list` dan `/add`

Selanjutnya kita akan membuat Componentnya terlebih dahulu dengan MUI sebelum kita melakukan Wiring dengan API Github

#### Langkah 2.3 - Mempercantik Component ListRepositories.jsx
Pada langkah ini kita akan membuat tabel pada ListRepositories yang akan menampilkan data dari Github.

Data kembalian pada saat melisting repositories dari github adalah sebagai berikut:

```json
[
  {
    "id": 1296269,
    "node_id": "MDEwOlJlcG9zaXRvcnkxMjk2MjY5",
    "name": "Hello-World",
    "full_name": "octocat/Hello-World",
    "owner": {
      "login": "octocat",
      "id": 1,
      "node_id": "MDQ6VXNlcjE=",
      "avatar_url": "https://github.com/images/error/octocat_happy.gif",
      "gravatar_id": "",
      "url": "https://api.github.com/users/octocat",
      "html_url": "https://github.com/octocat",
      "followers_url": "https://api.github.com/users/octocat/followers",
      "following_url": "https://api.github.com/users/octocat/following{/other_user}",
      "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
      "organizations_url": "https://api.github.com/users/octocat/orgs",
      "repos_url": "https://api.github.com/users/octocat/repos",
      "events_url": "https://api.github.com/users/octocat/events{/privacy}",
      "received_events_url": "https://api.github.com/users/octocat/received_events",
      "type": "User",
      "site_admin": false
    },
    "private": false,
    "html_url": "https://github.com/octocat/Hello-World",
    "description": "This your first repo!",
    "fork": false,
    "url": "https://api.github.com/repos/octocat/Hello-World",
    "archive_url": "https://api.github.com/repos/octocat/Hello-World/{archive_format}{/ref}",
    "assignees_url": "https://api.github.com/repos/octocat/Hello-World/assignees{/user}",
    "blobs_url": "https://api.github.com/repos/octocat/Hello-World/git/blobs{/sha}",
    "branches_url": "https://api.github.com/repos/octocat/Hello-World/branches{/branch}",
    "collaborators_url": "https://api.github.com/repos/octocat/Hello-World/collaborators{/collaborator}",
    "comments_url": "https://api.github.com/repos/octocat/Hello-World/comments{/number}",
    "commits_url": "https://api.github.com/repos/octocat/Hello-World/commits{/sha}",
    "compare_url": "https://api.github.com/repos/octocat/Hello-World/compare/{base}...{head}",
    "contents_url": "https://api.github.com/repos/octocat/Hello-World/contents/{+path}",
    "contributors_url": "https://api.github.com/repos/octocat/Hello-World/contributors",
    "deployments_url": "https://api.github.com/repos/octocat/Hello-World/deployments",
    "downloads_url": "https://api.github.com/repos/octocat/Hello-World/downloads",
    "events_url": "https://api.github.com/repos/octocat/Hello-World/events",
    "forks_url": "https://api.github.com/repos/octocat/Hello-World/forks",
    "git_commits_url": "https://api.github.com/repos/octocat/Hello-World/git/commits{/sha}",
    "git_refs_url": "https://api.github.com/repos/octocat/Hello-World/git/refs{/sha}",
    "git_tags_url": "https://api.github.com/repos/octocat/Hello-World/git/tags{/sha}",
    "git_url": "git:github.com/octocat/Hello-World.git",
    "issue_comment_url": "https://api.github.com/repos/octocat/Hello-World/issues/comments{/number}",
    "issue_events_url": "https://api.github.com/repos/octocat/Hello-World/issues/events{/number}",
    "issues_url": "https://api.github.com/repos/octocat/Hello-World/issues{/number}",
    "keys_url": "https://api.github.com/repos/octocat/Hello-World/keys{/key_id}",
    "labels_url": "https://api.github.com/repos/octocat/Hello-World/labels{/name}",
    "languages_url": "https://api.github.com/repos/octocat/Hello-World/languages",
    "merges_url": "https://api.github.com/repos/octocat/Hello-World/merges",
    "milestones_url": "https://api.github.com/repos/octocat/Hello-World/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/octocat/Hello-World/notifications{?since,all,participating}",
    "pulls_url": "https://api.github.com/repos/octocat/Hello-World/pulls{/number}",
    "releases_url": "https://api.github.com/repos/octocat/Hello-World/releases{/id}",
    "ssh_url": "git@github.com:octocat/Hello-World.git",
    "stargazers_url": "https://api.github.com/repos/octocat/Hello-World/stargazers",
    "statuses_url": "https://api.github.com/repos/octocat/Hello-World/statuses/{sha}",
    "subscribers_url": "https://api.github.com/repos/octocat/Hello-World/subscribers",
    "subscription_url": "https://api.github.com/repos/octocat/Hello-World/subscription",
    "tags_url": "https://api.github.com/repos/octocat/Hello-World/tags",
    "teams_url": "https://api.github.com/repos/octocat/Hello-World/teams",
    "trees_url": "https://api.github.com/repos/octocat/Hello-World/git/trees{/sha}",
    "clone_url": "https://github.com/octocat/Hello-World.git",
    "mirror_url": "git:git.example.com/octocat/Hello-World",
    "hooks_url": "https://api.github.com/repos/octocat/Hello-World/hooks",
    "svn_url": "https://svn.github.com/octocat/Hello-World",
    "homepage": "https://github.com",
    "language": null,
    "forks_count": 9,
    "stargazers_count": 80,
    "watchers_count": 80,
    "size": 108,
    "default_branch": "master",
    "open_issues_count": 0,
    "is_template": true,
    "topics": [
      "octocat",
      "atom",
      "electron",
      "api"
    ],
    "has_issues": true,
    "has_projects": true,
    "has_wiki": true,
    "has_pages": false,
    "has_downloads": true,
    "archived": false,
    "disabled": false,
    "visibility": "public",
    "pushed_at": "2011-01-26T19:06:43Z",
    "created_at": "2011-01-26T19:01:12Z",
    "updated_at": "2011-01-26T19:14:43Z",
    "permissions": {
      "admin": false,
      "push": false,
      "pull": true
    },
    "allow_rebase_merge": true,
    "template_repository": null,
    "temp_clone_token": "ABTLWHOULUVAXGTRYU7OC2876QJ2O",
    "allow_squash_merge": true,
    "allow_auto_merge": false,
    "delete_branch_on_merge": true,
    "allow_merge_commit": true,
    "subscribers_count": 42,
    "network_count": 0,
    "license": {
      "key": "mit",
      "name": "MIT License",
      "url": "https://api.github.com/licenses/mit",
      "spdx_id": "MIT",
      "node_id": "MDc6TGljZW5zZW1pdA==",
      "html_url": "https://github.com/licenses/mit"
    },
    "forks": 1,
    "open_issues": 1,
    "watchers": 1
  }
]
```

Cukup panjang yah?

Selamat datang di dunia perdataan asli yang cukup kompleks !

Kembali ke topik, yang akan ditampilkan pada tabel List Repositories adalah:
- `id`
- `name`
- `private`
- `created_at`
- `html_url`

Langkah pengerjaannya adalah:
1. Buka file `/src/containers/ListRepositories.jsx`
1. Modifikasi file menjadi sebagai berikut
    ```JSX
    import React from "react";

    import {
      Box,
      Table,
      TableBody,
      TableCell,
      TableHead,
      TableRow,
      Typography,
    } from "@mui/material";

    const ListRepositories = () => {
      return (
        <>
          <Box sx={{ border: "1px dashed grey", p: 2, marginTop: 2 }}>
            <Typography variant="h5">Repositoriku Apa Saja?</Typography>

            <Table
              sx={{
                minWidth: 768,
              }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Creation Time</TableCell>
                  <TableCell align="center">Go To Repo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Ini nanti bisa dijadikan Component bila diperlukan */}
                <TableRow>
                  <TableCell align="center">1</TableCell>
                  <TableCell align="center">Dummy</TableCell>
                  <TableCell align="center">Public</TableCell>
                  <TableCell align="center" l>
                    2000-01-01
                  </TableCell>
                  <TableCell align="center">Click Me</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </>
      );
    };

    export default ListRepositories;
    ```

Sampai pada titik ini artinya kita sudah berhasil membuat Component `ListRepositories`-nya dengan baik. Selanjutnya kita akan membuat Component `FormAddRepository`-nya

#### Langkah 2.4 - Mempercantik Component FormAddRepository.jsx
Pada langkah ini kita akan membuat sebuah Form yang ditujukan untuk membuat sebuah Repository yang baru pada Github, dimana usernya bisa memilih sifat repositorynya adalah `public` ataupun `private`.

Repository yang dibuat nanti akan secara otomatis memiliki sebuah file .gitignore khusus untuk project berbasis `nodejs` dan memiliki lisensi bertipe `mit`.

Data yang dibutuhkan saat membuat repository yang baru adalah sebagai berikut:
```
name  string  Required
The name of the repository.

description string
A short description of the repository.

homepage  string
A URL with more information about the repository.

private boolean
Whether the repository is private.

has_issues  boolean
Whether issues are enabled.

has_projects  boolean
Whether projects are enabled.

has_wiki  boolean
Whether the wiki is enabled.

team_id   integer
The id of the team that will be granted access to this repository. This is only valid when creating a repository in an organization.

auto_init   boolean
Whether the repository is initialized with a minimal README.

gitignore_template  string
The desired language or platform to apply to the .gitignore.

license_template  string
The license keyword of the open source license for this repository.

allow_squash_merge  boolean
Whether to allow squash merges for pull requests.

allow_merge_commit   boolean
Whether to allow merge commits for pull requests.

allow_rebase_merge    boolean
Whether to allow rebase merges for pull requests.

allow_auto_merge    boolean
Whether to allow Auto-merge to be used on pull requests.

delete_branch_on_merge    boolean
Whether to delete head branches when pull requests are merged

squash_merge_commit_title   string
The default value for a squash merge commit title:

squash_merge_commit_message   string
The default value for a squash merge commit message:

has_downloads   boolean
Whether downloads are enabled.

is_template   boolean
Whether this repository acts as a template that can be used to generate new repositories.
```

Wah banyak sekali yah data yang dibutuhkan pada saat ingin request bikin satu repository saja?

Tenang... tidak semuanya butuh disupply pada saat membuat repository yang baru kok !

Yang kita butuhkan berdasarkan requirement di atas adalah sebagai berikut:
- name (string)
- private (boolean)
- gitignore_template, string dengan value `Node`
- license_template, string dengan value `mit`

Nah setelah kita mengetahui data apa saja yang dibutuhkan, mari kita membuat Formnya

Langkah pengerjaannya adalah:
1. Buka file `/src/containers/FormAddRepository.jsx`
1. Modifikasi file menjadi sebagai berikut:
    ```JSX
    import React from "react";

    import {
      Box,
      Button,
      TextField,
      Typography,
      FormControl,
      Select,
      InputLabel,
      MenuItem,
    } from "@mui/material";

    const FormAddRepository = () => {
      return (
        <>
          <Box
            sx={{
              border: "1px dashed grey",
              p: 2,
              marginTop: 2,
            }}
          >
            <Typography variant="h5">Nambah Repo Baru Yuk</Typography>
            <FormControl
              fullWidth
              sx={{
                marginTop: "1em",
                display: "flex",
                flexDirection: "column",
                gap: "0.5em",
              }}
            >
              <InputLabel id="status-label">Status</InputLabel>
              <Select label="Status" labelId="status-label" id="status">
                <MenuItem value={"false"}>Public</MenuItem>
                <MenuItem value={"true"}>Private</MenuItem>
              </Select>
              <TextField fullWidth label="Nama Repository" />
              <Button variant="contained" size="large">
                Submit
              </Button>
            </FormControl>
          </Box>
        </>
      );
    };

    export default FormAddRepository;
    ```
1. Karena kita mengetahui bahwa membutuhkan state untuk mengubah input yang ada, maka kita juga akan menambahkan `state` ke dalam Component ini sekarang. Modifikasi file `/src/components/FormAddRepository.jsx` lagi sebagai berikut:
    ```JSX
    import React, { useState } from "react";

    import {
      Box,
      Button,
      TextField,
      Typography,
      FormControl,
      Select,
      InputLabel,
      MenuItem,
    } from "@mui/material";

    const FormAddRepository = () => {
      const [repoStatus, setRepoStatus] = useState("false"); // set awalnya jadi public
      const [repoName, setRepoName] = useState("");

      const textFieldOnChangeHandler = (evt) => {
        setRepoName(evt.target.value);
      };

      const selectOnChangeHandler = (evt) => {
        setRepoStatus(evt.target.value);
      };

      const formOnSubmitHandler = (evt) => {
        evt.preventDefault();
        console.log(repoStatus, repoName);
      };

      return (
        <>
          <Box
            sx={{
              border: "1px dashed grey",
              p: 2,
              marginTop: 2,
            }}
          >
            <Typography variant="h5">Nambah Repo Baru Yuk</Typography>
            <form onSubmit={formOnSubmitHandler}>
              <FormControl
                fullWidth
                sx={{
                  marginTop: "1em",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5em",
                }}
              >
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  label="Status"
                  labelId="status-label"
                  id="status"
                  value={repoStatus}
                  onChange={selectOnChangeHandler}
                >
                  <MenuItem value={"false"}>Public</MenuItem>
                  <MenuItem value={"true"}>Private</MenuItem>
                </Select>
                <TextField
                  fullWidth
                  label="Nama Repository"
                  value={repoName}
                  onChange={textFieldOnChangeHandler}
                />
                <Button variant="contained" size="large" type="submit">
                  Submit
                </Button>
              </FormControl>
            </form>
          </Box>
        </>
      );
    };

    export default FormAddRepository;
    ```

Sampai di titik ini artinya kita sudah berhasil untuk membuat seluruh Component yang dibutuhkan untuk dihubungkan ke API Github.

Langkah selanjutnya adalah kita akan mencoba untuk membuat kode untuk melakukan penghubungan dengan API Github kemudian akan kita Wiring dengan aplikasi React yang kita buat.

### Langkah 3 - Connect ke API Github dengan Axios

Untuk membaca tentang API dari Github dapat membuka dokumentasi yang ada di sini yah:
- [Getting Started](https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api)
- [Listing Repos](https://docs.github.com/en/rest/repos/repos#list-repositories-for-the-authenticated-user)
- [Buat Repo Baru](https://docs.github.com/en/rest/repos/repos#create-a-repository-for-the-authenticated-user)

Pada langkah ini kita akan membuat kode untuk menembak ke API Github dengan menggunakan `axios`.

Karena hampir seluruh dari `tembakan` (`request`) API ini harus menggunakan `Personal Access Token` dari Github yang akan dijadikan sebagai `Bearer Authentication` (nama header: `Authorization`), maka, supaya kode kita menjadi lebih pendek, kita akan menggunakan `axios instance` saja.

Untuk dokumentasi tentang pembuatan `axios instance` bisa dibaca pada dokumentasi [Axios Instance](https://www.npmjs.com/package/axios#creating-an-instance).

Langkah pembuatannya adalah sebagai berikut:
1. Buat file `/src/apis/github.js`
1. Modifikasi kode menjadi sebagai berikut:
    ```js
    import axios from "axios";

    const personalAccessToken = "MASUKKAN_TOKEN_PAT_DISINI";

    const instance = axios.create({
      baseURL: "https://api.github.com",
      // Setiap kali kita menembak ke github,
      // Maka headers ini akan selalu diberikan
      headers: {
        // Pada dokumentasi Github,
        // untuk melakukan Authentication harus memberikan headers Authorization
        // dalam bentuk bearer token dan tokennya adalah personal access token
        Authorization: `Bearer ${personalAccessToken}`,
        // Pada dokumentasi Github juga direkomendasikan
        // untuk memberikan header tambahan ini
        // dalam setiap request / tembakan yang ada
        Accept: "application/vnd.github+json",
      },
    });

    export default instance;
    ```

Sampai di langkah ini artinya kita sudah membuat koneksi ke Github via axios instance ini. Selanjutnya kita akan menyelesaikannya dengan menghubungkannya dengan aplikasi React yang dibuat

### Langkah 4 - Wiring dengan React