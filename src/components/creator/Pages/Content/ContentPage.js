import React from 'react'
import ContentList from '../../creator/content/ContentList'
// import CreatorHeader from '../../creator/CreatorHeader';

function ContentPage() {
    const contentData = [
        {
          title: 'Song Title 1',
          numberOfBuys: 100,
          price: '$0.99',
          length: '3:45',
        },
        {
          title: 'Song Title 2',
          numberOfBuys: 85,
          price: '$1.25',
          length: '4:12',
        },
        {
          title: 'Podcast Episode 1',
          numberOfBuys: 50,
          price: '$0.00 (Free)',
          length: '25:30',
        },
        {
          title: 'Ebook - Introduction to React',
          numberOfBuys: 120,
          price: '$9.99',
          length: '150 pages',
        },
        // Add more content items as needed
      ];
      
  return (
    <div>
        {/* <CreatorHeader /> */}
        <ContentList contentData={contentData} />
        {/* <Footer /> */}
    </div>
  )
}

export default ContentPage