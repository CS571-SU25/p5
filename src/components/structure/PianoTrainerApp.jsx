import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

import PianoTrainerHome from "./PianoTrainerHome.jsx";
import MainPage from "../pages/MainPage.jsx";
import Settings from "../pages/Settings.jsx";

function PianoTrainerApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PianoTrainerHome />}>
                    <Route index element={<MainPage />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="*" element={<PianoTrainerHome />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default PianoTrainerApp;
