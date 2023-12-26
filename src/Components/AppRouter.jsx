import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "../layouts/Layout";
import { HomePage } from "../pages/HomePage";
import { SettingsPage } from "../pages/SettingsPage";
import { Login } from "./Login";
import { RequireAuth } from "../hoc/RequireAuth";
import { SettingUsername } from "./Setting_Username";
import { SettingEmail } from "./Setting_email";
import { SettingAvatar } from "./Setting_avatar";
import { SettingPassword } from "./Setting_password";

function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="settings" element={<SettingsPage />}>
          <Route index element={<h2>SETTINGS HOME</h2>}></Route>
          <Route path="username" element={<SettingUsername />}></Route>
          <Route path="email" element={<SettingEmail />}></Route>
          <Route path="avatar" element={<SettingAvatar />}></Route>
          <Route path="password" element={<SettingPassword/>}></Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Route>
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export { AppRouter };
