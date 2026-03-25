import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import TodayPage from './pages/TodayPage';
import TimelinePage from './pages/TimelinePage';
import TemplatePage from './pages/TemplatePage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<TodayPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/templates" element={<TemplatePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
