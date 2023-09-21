import React, { useState } from 'react';
import './Footer.css'
import HomeTab from './HomeTab/HomeTab';
import BookmarksTab from './BookmarksTab/BookmarksTab';
import FavoritesTab from './FavoritesTab/FavoritesTab';
import DmsTab from './DM/DmsTab';

function Footer() {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="footer">
      <HomeTab isActive={activeTab === 'home'} onClick={handleTabClick} />
      <BookmarksTab isActive={activeTab === 'bookmarks'} onClick={handleTabClick} />
      <FavoritesTab isActive={activeTab === 'favorites'} onClick={handleTabClick} />
      <DmsTab isActive={activeTab === 'messages'} onClick={handleTabClick} />
    </div>
  );
}

export default Footer;
